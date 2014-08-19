
EasyPress.controller('DragQueenController', function($scope) {

	$scope.$parent.title = "Queen";
	$scope.highlightHover = true;
	$scope.clickSelect = true;
	$scope.candidate;
	var editables = ["P","ARTICLE","BLOG-POST","SPAN","H1","H2","H3","H4","H5","H6"];

	$scope.initSite = function() {

		$scope.setUpTarget();
		$scope.active = {
			"element": $scope.TARGET_BODY,
			"string": "body",
		};
		$scope.$watch('active.element',function() {
			$scope.active.string = $scope.active.element.id || $scope.active.element.nodeName.toLowerCase();
		});
		$scope.$apply();

		addEvent($scope.TARGET_DOCUMENT, 'mouseover', function (e) {
			if ($scope.highlightHover) {
				var target = e.target ? e.target : e.srcElement;
				if ($scope.candidate != null) {
					$scope.candidate.style.outline = "";
				}
				$scope.candidate = target;
				if (["HTML","BODY"].indexOf($scope.candidate.nodeName) == -1) {
					$scope.candidate.style.outline = "1px solid red";
				}
			}
		});
		addEvent($scope.TARGET_DOCUMENT, 'click', function (e) {
			if ($scope.clickSelect) {
				var target = e.target ? e.target : e.srcElement;
				$scope.setActive(target);
				$scope.$apply();
			}
		});
		addEvent($scope.TARGET_DOCUMENT, 'mouseout', function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;
			if (!from || from.nodeName == "HTML" && $scope.candidate) {
				$scope.candidate.style.outline = "";
			}
		});
	};

	$scope.setActive = function(element) {

		$scope.active.element = element;

		var limbs = $scope.TARGET_BODY.getElementsByTagName("*");
		for (var i = 0; i < limbs.length; i++) {
			limbs[i].style.outline = "";
			limbs[i].contentEditable = "inherit";
		}

		if (element !== $scope.TARGET_BODY && element.nodeName != "HTML") {
			$scope.active.element.style.outline = "green solid thin";
		}
		if (editables.indexOf(element.nodeName) != -1) {
			element.contentEditable = "true";
			element.focus();
			document.execCommand('styleWithCss',false,true);
			$scope.setMenu("rich_text");
		}
		else {
			$scope.setMenu('main_menu');
		}
	};

	var menuItems = {
		"main_menu": "admin/templates/main_menu.html",
		"tree": "admin/templates/tree.html",
		"style": "admin/templates/style.html",
		"grid": "admin/templates/grid.html",
		"bootstrap": "admin/templates/bootstrap.html",
		"html": "admin/templates/html.html",
		"tags": "admin/templates/tags.html",
		"archive": "admin/templates/archive.html",
		"blog": "admin/templates/createBlog.html",
		"rich_text": "admin/templates/richtext.html"
	};

	$scope.setMenu = function(menu){
		$scope.activeMenu = menuItems[menu];
	};
	$scope.setMenu('main_menu');

	// Drag box
	var offX;
	var offY;

	addEvent(document.getElementById('DragQueen'),'mouseenter', mouseEnter);
	addEvent(document.getElementById('DragQueen'),'mousedown', mouseDown);
	addEvent(window,'mouseup', mouseUp);

	function mouseEnter(e) {
		// When mouse enter DragQueen the hover-highlighted element should restore to normal
		if ($scope.candidate) {
			$scope.candidate.style.outline = "";
		}
	}

	function mouseDown(e){
		// Hide all mouseevents from iframe by sinking it below shieldin div
		document.getElementById('MainContent').style.zIndex = -1000;

		var div = document.getElementById('DragQueen');
		offY = e.clientY-parseInt(div.offsetTop, 10);
		offX = e.clientX-parseInt(div.offsetLeft, 10);
		addEvent(window,'mousemove',divMove, true);
		addEvent(document,'mouseout',divRelease);
	}

	function mouseUp(){
		// Return iframe to surface to begin receiving mousevents again
		document.getElementById('MainContent').style.zIndex = 0;
		window.removeEventListener('mousemove', divMove, true);
	}

	function divMove(e){
		var div = document.getElementById('DragQueen');
		div.style.position = 'absolute';
		div.style.top = (e.clientY-offY) + 'px';
		div.style.left = (e.clientX-offX) + 'px';
	}

	function divRelease(e){
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
			window.removeEventListener('mousemove', divMove, true);
		}
	}

	function addEvent(node, ename, handler, capture)
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

});
