
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', ['$scope', '$http', '$location','$compile','ContentService', function($scope, $http, $location, $compile, ContentService) {

	$scope.title = "Queen";
	$scope.highlightHover = true;
	$scope.clickSelect = true;
	$scope.Editor = {};
	$scope.Actions = [];

	var candidate;
	var workSheet;
	
	// When these elements are selected a rich text editor will be invoked
	var editables = ["P","ARTICLE","SECTION","BLOG-POST","SPAN","H1","H2","H3","H4","H5","H6","B","I","U","EM","STRONG","SPAN"];

	$scope.addEvent = function(node, ename, handler, capture) {
		if(typeof document.addEventListener != 'undefined')
		{
			node.addEventListener(ename, handler, capture);
		}
		else if(typeof document.attachEvent != 'undefined')
		{
			node.attachEvent('on' + ename, handler);
		}
	};

    $scope.removeEvent = function removeEvent(node, ename, handler, capture) {
		if (typeof document.removeEventListener != 'undefined') {
			node.removeEventListener(ename, handler, capture || false);
		} else if (typeof document.detachEvent != 'undefined') {
			node.detachEvent("on" + ename, handler);
		} else {
			element['on' + ename] = null;
		}
	};

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

		var iframe = document.getElementById('MainContent');
		$scope.TARGET_WINDOW = iframe.contentWindow || iframe;
		$scope.TARGET_DOCUMENT = iframe.contentDocument || iframe.contentWindow.document;
		$scope.TARGET_HEAD = $scope.TARGET_DOCUMENT.getElementsByTagName('head')[0];
		$scope.TARGET_BODY = $scope.TARGET_DOCUMENT.getElementsByTagName('body')[0];
		$scope.TARGET_STORED_STYLE = $scope.TARGET_HEAD.getElementsByClassName('user-style-sheet')[0];
		$scope.TARGET_STYLE = document.createElement('style');
		$scope.TARGET_STYLE.type = 'text/css';
		$scope.TARGET_HEAD.appendChild($scope.TARGET_STYLE);
		workSheet = $scope.TARGET_STYLE.sheet || $scope.TARGET_STYLE.styleSheet;

		// Initiate Medium.js editor module
		//Medium = Medium($scope.TARGET_WINDOW,$scope.TARGET_DOCUMENT);
		
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
					$scope.setActive(target, true); //true: Start editor if element is editable
				}
				else if (target.nodeName == "HTML") {
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
		$scope.addEvent($scope.TARGET_WINDOW, 'keydown', $scope.keyDown);
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

	$scope.setActive = function(element,edit) {
		// Disable glow on old element
		$scope.active.element.style.outline = "";
		$scope.active.element.style.boxShadow = "";

		if ($scope.activeMenu == menuItems['richtext']) {
			console.log("disabling editor...");
				$scope.$apply(function(){
					$scope.active.element.contentEditable = false;
					$scope.active.element.spellcheck = "";
					//$scope.active.element.blur();
				});
			//$scope.active.element.focus();
		}

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
		
		if (edit) {
			$scope.setMenu('richtext');
		}
		
		else {
			$scope.setMenu('main');
		}
	};


	// 'Lynx'-style navigation of the DOM - alters the selected/active element in specified direction
	//
	// 	- Right = 	means 'stepping into' an element/tag/node 		-> firstChild
	// 	- Left - 	means 'stepping out' of current node 			-> parentNode
	// 	 - Up - 	means going to previous element on same level 	-> previousElementSibling
	// 	- Down - 	means going to next element on same level 		-> nextElementSibling
	//
	// Managed by the arrow buttons on the DragQueen interface or by the arrow keys. 
	// May also be used programmatically from a template/view, as when leaving richtext editor.
	
	$scope.navigate = function(dir) {
		console.log("in navigate");
		var elem = $scope.active.element;
		switch(dir) {
			case "up":
				if (elem !== $scope.TARGET_BODY && elem.previousElementSibling) {
					$scope.setActive(elem.previousElementSibling)
				}
				break;
			case "left":
				if (elem.nodeName !== "BODY")
					$scope.setActive(elem.parentNode);
				break;
			case "right":
				if (elem.children.length)
					$scope.setActive(elem.children[0]);
				break;
			case "down":
				if (elem.nextElementSibling)
					$scope.setActive(elem.nextElementSibling);
				break;
			case "home":
				$scope.setActive($scope.TARGET_BODY);
				break;
		}
	};

	// EVENT HANDLERS //
	
	// Keybindings for navigation (and other things)
	
	$scope.keyDown = function(e){
		e = e ? e : window.event;
		$scope.keyIsDown = e.keyCode;
		console.log("in keydown");
		switch (e.keyCode){
			// Navigation
			case 37:
				$scope.navigate('left');
				break;
			case 38:
				$scope.navigate('up');
				break;
			case 39:
				$scope.navigate('right');
				break;
			case 40:
				$scope.navigate('down');
				break
			case 46:
			case 68:
				var elem = $scope.active.element;
				var next = elem.nextElementSibling || elem.previousElementSibling || elem.parentNode;
				$scope.removeElement($scope.active.element);
				$scope.setActive(next);
				$scope.$apply();
				break;
			case 69:
				$scope.setMenu('richtext');
				break;
			case 85:
				var action = $scope.Actions.pop();
				action.undo();
				break;
		}	
		$scope.$apply();
	};
	
	// Only debug/devel-tool
	function keyUp(e){
		setTimeout(function(){
			$scope.keyIsDown = null;
			$scope.$apply()
		},1000);
	}

	$scope.addEvent(window,'keydown',$scope.keyDown,true);
	//$scope.addEvent(window,'keyup',keyUp);

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
		var action = {
			undo: function(){
				parent.appendChild(element);
			},
			insert: function(ref){
				$scope.insertAfter(element,ref);
			}
		};
		$scope.Actions.push(action);
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
				title: null, //replace with function calls
				theme: null,
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
