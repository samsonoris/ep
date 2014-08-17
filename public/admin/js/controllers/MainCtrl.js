
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', ['$scope', '$http', function($scope, $http) {

	$scope.title;
	var workSheet;
	var newTitle;
	var newTheme;
	var newStyle;

	$scope.setUpTarget = function() {
		$scope.TARGET_DOCUMENT = document.getElementById('MainContent').contentDocument;
		$scope.TARGET_HEAD = $scope.TARGET_DOCUMENT.getElementsByTagName('head')[0];
		$scope.TARGET_BODY = $scope.TARGET_DOCUMENT.getElementsByTagName('body')[0];
		$scope.TARGET_STORED_STYLE = $scope.TARGET_HEAD.getElementsByClassName('user-style-sheet')[0];
		$scope.TARGET_STYLE = document.createElement('style');
		$scope.TARGET_STYLE.type = 'text/css';
		$scope.TARGET_HEAD.appendChild($scope.TARGET_STYLE);
		workSheet = $scope.TARGET_STYLE.sheet || $scope.TARGET_STYLE.styleSheet;
	}

  	$scope.setTheme = function(fileName){
    	document.head.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		$scope.TARGET_HEAD.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		//TODO set variable to store new theme when saving to db
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
		$http({
			url: "/save",
			method: "POST",
			data: {
				title: newTitle,
				theme: newTitle,
				style: '<style>' + newStyle + '</style>'
			},
			headers: {
				'Content-Type': 'application/json'
			}
		}).success(function(data){

		}).error(function(data){

		});
		newStyle = "";
	};
	

	// Collect styles before save
	var styleMap = {};
	newStyle = "";
	$scope.collectStyle = function(){
		rules = workSheet.cssRules;
		for (var i in rules) {
			if (i == "length") break;
			//console.log(i,rules[i],rules[i].selectorText,rules[i].style);
			var selector = rules[i].selectorText;
			var rule = rules[i].style[0];
			styleMap[selector] = styleMap[selector] || {};
			styleMap[selector][rule] = rules[i].style[rule];
		}
		var storedSheet = $scope.TARGET_STORED_STYLE.sheet || $scope.TARGET_STORED_STYLE.styleSheet;
		var storedRules = storedSheet.cssRules;
		for (var selector in styleMap) {
			for (var j in storedRules) {
				if (j == "length") break;
				if (storedRules[j].selectorText == selector) {
					for (var prop in styleMap[selector]) {
						storedRules[j].style[prop] = styleMap[selector][prop];
					}
				}
				newStyle += storedRules[j].cssText;
			}
			//TODO safeguard for shorthand properties
		}

		console.log(newStyle);
		$scope.saveRevision();
	}


}]);
