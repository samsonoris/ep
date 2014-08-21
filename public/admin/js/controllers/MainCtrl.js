
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', ['$scope', '$http', '$location','ContentService', function($scope, $http, $location,ContentService) {

	$scope.title = "Queen";
	$scope.highlightHover = true;
	$scope.clickSelect = true;
	$scope.Editor = {};

	var candidate;
	var workSheet;
	
	$scope.addEvent = function(node, ename, handler, capture)
	{
		if(typeof document.addEventListener != 'undefined')
		{
			node.addEventListener(ename, handler, capture);
		}
		else if(typeof document.attachEvent != 'undefined')
		{
			node.attachEvent('on' + ename, handler);
		}
	}

	$scope.setCandidate = function(element) {
		candidate = element;
		if (["HTML","BODY","HEAD"].indexOf(candidate.nodeName) == -1) {
			candidate.style.outline = "2px solid red";
		}
	};

	$scope.resetOutlines = function() {
		if (candidate === $scope.active.element && candidate.nodeName !== "BODY") {
			candidate.style.outline = "2px solid -webkit-focus-ring-color";
			candidate.style.boxShadow = "0 0 4px #00ffff";
		}
		else if (candidate) {
			candidate.style.outline = "";
		}
	}

	$scope.setUpTarget = function() {

		$scope.TARGET_DOCUMENT = document.getElementById('MainContent').contentDocument;
		$scope.TARGET_HEAD = $scope.TARGET_DOCUMENT.getElementsByTagName('head')[0];
		$scope.TARGET_BODY = $scope.TARGET_DOCUMENT.getElementsByTagName('body')[0];
		$scope.TARGET_STORED_STYLE = $scope.TARGET_HEAD.getElementsByClassName('user-style-sheet')[0];
		$scope.TARGET_STYLE = document.createElement('style');
		$scope.TARGET_STYLE.type = 'text/css';
		$scope.TARGET_HEAD.appendChild($scope.TARGET_STYLE);
		workSheet = $scope.TARGET_STYLE.sheet || $scope.TARGET_STYLE.styleSheet;

		// Start angular module of target document
		angular.bootstrap($scope.TARGET_DOCUMENT.documentElement,['Queen']);
		$scope.active = {
			"element": $scope.TARGET_BODY,
			"string": "body",
		};
		$scope.$watch('active.element',function() {
			$scope.active.string = $scope.active.element.id || $scope.active.element.nodeName.toLowerCase();
		});
		$scope.$apply();

		$scope.addEvent($scope.TARGET_DOCUMENT, 'mouseover', function (e) {
			if ($scope.highlightHover) {
				e = e ? e : window.event;
				var target = e.target ? e.target : e.srcElement;
				if (candidate != null && candidate.style) {
					$scope.resetOutlines();
				}
				$scope.setCandidate(target);
			}
		});
		$scope.addEvent($scope.TARGET_DOCUMENT, 'click', function (e) {
			if ($scope.clickSelect) {
				var target = e.target ? e.target : e.srcElement;
				if (target === $scope.active.element) {
					return; // 
				}
				if (target.nodeName == "HTML") {
					$scope.setActive($scope.TARGET_BODY);
				}
				else {
					$scope.setActive(target);
				}
				$scope.$apply();
			}
		});
		$scope.addEvent($scope.TARGET_DOCUMENT, 'mouseout', function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;
			if (!from || from.nodeName === "HTML" && candidate) {
				$scope.resetOutlines();
			}
		});
	}

	// Main menu of the application
	
	var menuItems = {
		"main": "admin/templates/main.html",
		"tree": "admin/templates/tree.html",
		"style": "admin/templates/style.html",
		"grid": "admin/templates/grid.html",
		"bootstrap": "admin/templates/bootstrap.html",
		"html": "admin/templates/html.html",
		"tags": "admin/templates/tags.html",
		"archive": "admin/templates/archive.html",
		"blog": "admin/templates/createBlog.html",
		"elements": "admin/templates/elements.html",
		"richtext": "admin/templates/richtext.html"
	};

	$scope.setMenu = function(menu){
		console.log(menu);
		$scope.activeMenu = menuItems[menu];
	};
	$scope.setMenu('main');


	// When these elements are selected a rich text editor will be invoked
	var editables = ["P","ARTICLE","SECTION","BLOG-POST","SPAN","H1","H2","H3","H4","H5","H6","B","I","U","EM","STRONG","SPAN"];

	$scope.setActive = function(element) {
		// Disable glow on old element
		$scope.active.element.style.outline = "";
		$scope.active.element.style.boxShadow = "";

		if (!element) return;
		$scope.active.element = element;

		var limbs = $scope.TARGET_BODY.getElementsByTagName("*");
		for (var i = 0; i < limbs.length; i++) {
			limbs[i].contentEditable = "inherit";
		}

		if (element !== $scope.TARGET_BODY && element.nodeName != "HTML") {
			element.style.outline = "2px solid -webkit-focus-ring-color";
			element.style.boxShadow = "0 0 4px #00ffff";
		}
		if (editables.indexOf(element.nodeName) != -1) {
			//$scope.active.element.contentEditable = true;
			//$scope.active.element.spellcheck = false;
			//$scope.active.element.focus();
			//document.execCommand('styleWithCss',false,true);
			console.log("activeMenu: ", $scope.activeMenu);
			if ($scope.activeMenu.indexOf("richtext") != -1) {
				console.log("setting editor");
				$scope.active.element.contentEditable = true;
				$scope.Editor.element = $scope.active.element;
			}
			else {	
				$scope.setMenu("richtext");
			}
		}
		else {
			$scope.setMenu('main');
		}
	};
	// Methods to manipulate DOM
	//$scope.prepend = function(element) {

	$scope.append = function(element) {
		var elem = document.createElement(element);
		$scope.active.element.appendChild(elem);
		$scope.setActive(elem);
	};
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
		
		$http({
			url: "/save",
			method: "POST",
			data: {
				title: newTitle, //replace with function calls
				theme: newTheme,
				style: $scope.collectStyle(),
				content: $scope.collectDocument()
			},
			headers: {
				'Content-Type': 'application/json'
			}
		}).success(function(data){

		}).error(function(data){

		});
	};
	
	// Collect HTML before save
	$scope.collectDocument = function(){
		var fragments = [];
		var closings = [];
		walkTheDOM($scope.TARGET_BODY);
		console.log(fragments.join(''));
		return fragments.join('');
	
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
	};

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
		newStyle = '<style type="text/css" class="user-style-sheet">' + newStyle + '</style>';
		console.log("Collected styles: ", newStyle);
		return newStyle;
	}

	//Logout function
   	$scope.logout = function(){
		$http.post('/logout').success(
			function(){$location.path('/login');
		});
   	};
}]);
