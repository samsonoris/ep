
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', ['$scope', '$http', '$location','ContentService', function($scope, $http, $location,ContentService) {

	$scope.title;
	var workSheet;
	var newTitle;
	var newTheme;
	var newStyle;
	var page;
	
	$scope.setUpTarget = function() {
		$scope.TARGET_DOCUMENT = document.getElementById('MainContent').contentDocument;
		$scope.TARGET_HEAD = $scope.TARGET_DOCUMENT.getElementsByTagName('head')[0];
		$scope.TARGET_BODY = $scope.TARGET_DOCUMENT.getElementsByTagName('body')[0];
		$scope.TARGET_STORED_STYLE = $scope.TARGET_HEAD.getElementsByClassName('user-style-sheet')[0];
		$scope.TARGET_STYLE = document.createElement('style');
		$scope.TARGET_STYLE.type = 'text/css';
		$scope.TARGET_HEAD.appendChild($scope.TARGET_STYLE);
		workSheet = $scope.TARGET_STYLE.sheet || $scope.TARGET_STYLE.styleSheet;
		angular.bootstrap($scope.TARGET_DOCUMENT.documentElement,['Queen']);
	}

	$scope.setTheme = function(fileName){
		document.head.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		$scope.TARGET_HEAD.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		newTheme = fileName;
  	};
	
	// Methods to manipulate DOM
	$scope.insertBefore = function(newNode,referenceNode){
		referenceNode.parentNode.insertBefore(newNode,referenceNode);
	}
	$scope.inserAfter = function(newNode,referenceNode){
		referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);
	};
	$scope.removeElement = function(element) {
		var parent = element.parentNode;
		parent.removeChild(element);
	};

	// Methods to style by selector
	$scope.applyStyle = function(selector,key,value){
		key = key.replace(/([A-Z])/g,function(a,b){return "-" + b.toLowerCase();});
		if(!workSheet.insertRule) {
			//workSheet.addRule(selector, key + value);
		}
		else {
			console.log(selector + "{" + key + ":" + value + "}", workSheet.cssRules.length);
			workSheet.insertRule(selector + "{" + key + ":" + value + "}" ,workSheet.cssRules.length);
			console.log(workSheet);
		}
	};

	var removeStyle = $scope.removeStyle = function(selector,key) {
		rules = workSheet.cssRules;
		for (var i in rules) {
			if ((rules[i].selectorText == selector) && (rules[i].style[0] == key)) {
				rules.removeRule(i);
			}	
		}
	};

	$scope.saveRevision = function(){
		$scope.collectStyle();
		$scope.collectDocument();
		$http({
			url: "/save",
			method: "POST",
			data: {
				title: newTitle,
				theme: newTheme,
				style: '<style type="text/css" class="user-style-sheet">' + newStyle + '</style>',
				content: page
			},
			headers: {
				'Content-Type': 'application/json'
			}
		}).success(function(data){

		}).error(function(data){

		});
		newStyle = "";
	};
	
	// Collect HTML before save
	var fragments = [];
	var closings = [];
	$scope.collectDocument = function(){
		walkTheDOM($scope.TARGET_BODY);
		console.log("Page array: ",page = fragments.join(''));
		fragments = [];
		closings = [];
	};

	// Recursion from hell
	function walkTheDOM(node) {
		page = "";
		var html,open,close;

			if (node.nodeType === 1 && node.nodeName != "BODY") {
				html = ContentService.getHTMLshallow(node);
					open = html.match(/<[^/][^<]*>/)[0]; 
				if (html.match(/<\/.*>/)) {
					close = html.match(/<\/.*>/)[0];
				}
				if (node.className.match(/blog-module/)) {
					fragments.push(open + angular.element(document.body).injector().get('blogModuleDirective')[0].template + close);
					return;
				}
				if (node.children.length) {
					fragments.push(open);
					closings.push(close);
				}
				/*
				else if (node.previousSibling.textContent.match(/ngRepeat/)) {

				}*/
				else {
					fragments.push(node.outerHTML);
					if (!node.nextSibling) {
						return;
					}
				}
			}
			if (node.children && node.children.length) {
				var next = node.firstChild;
				while (next) {
					walkTheDOM(next);
					next = next.nextSibling;
				}
				if (node.nodeName != "BODY") {
					fragments.push(closings.pop());
				}
			}
	}

	// Collect styles before save
	$scope.collectStyle = function(){
		var styleMap = {};
		newStyle = "";
		rules = workSheet.cssRules;
		for (var i in rules) {
			if (i == "length") break;
			console.log(i,rules[i],rules[i].selectorText,rules[i].style);
			var selector = rules[i].selectorText;
			var rule = rules[i].style[0];
			styleMap[selector] = styleMap[selector] || {};
			styleMap[selector][rule] = rules[i].style[rule];
		}
		console.log(styleMap);
		var storedSheet = $scope.TARGET_STORED_STYLE.sheet || $scope.TARGET_STORED_STYLE.styleSheet;
		var storedRules = storedSheet.cssRules;
		for (var j in storedRules) {
			if (j == "length") break;
			var completed = 0;
			for (var selector in styleMap) {
				if (storedRules[j].selectorText == selector) {
					for (var prop in styleMap[selector]) {
						storedRules[j].style[prop] = styleMap[selector][prop];
					}
					delete styleMap[selector];
					newStyle += storedRules[j].cssText;
					console.log("In for loop: ", newStyle);
					check = 1;
				}
			}
			if (!completed) {
				newStyle += storedRules[j].cssText;
			}
		}
		// If selector didn't match an old rule
		for (var selector in styleMap) {
			var started = 0;
			for (var prop in styleMap[selector]) {
				if (!started) {
					newStyle += selector + "{";
					started = 1;
				}
				newStyle += prop + ":" + styleMap[selector][prop] + ";";
			}
			if (started) {
				newStyle += "}";
			}
			//TODO safeguard for shorthand properties
		}

		console.log("In the End,new Style: ", newStyle);
	}

	//Logout function
   $scope.logout = function(){
		$http.post('/logout').success(
			function(){$location.path('/login');
		});
   };
}]);
