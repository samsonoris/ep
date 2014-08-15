
EasyPress.controller('DragQueenController', function($scope) {

	$scope.$parent.title = "Ep-admin Edit";
	$scope.highlightHover = true;
	$scope.clickSelect = true;
	$scope.candidate;
	
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

		addEvent($scope.TARGET_DOCUMENT, 'mouseover', function(e) {
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

		addEvent($scope.TARGET_DOCUMENT, 'click', function(e) {
			if ($scope.clickSelect) {
				var target = e.target ? e.target : e.srcElement;
				console.log("In click handler, target: ". target);
				$scope.setActive(target);
				$scope.$apply();
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
		$scope.active.element.style.outline = "green solid thin";

		if (element !== $scope.TARGET_BODY) {
			console.log("Activating editor..");
			$scope.active.element.contentEditable = "true";
			$scope.active.element.focus();
			document.execCommand('styleWithCss',false,true);
		}
		$scope.setMenu("main_menu");
	};

	var menuItems = {
		"main_menu": "admin/templates/main_menu.html",
		"tree": "admin/templates/tree.html",
		"style": "admin/templates/style.html",
		"grid": "admin/templates/grid.html",
		"bootstrap": "admin/templates/bootstrap.html",
		"html": "admin/templates/html.html",
		"tags": "admin/templates/tags.html",
	};

	$scope.setMenu = function(menu){
		$scope.activeMenu = menuItems[menu];
	};
	$scope.setMenu('main_menu');

	// Drag box
	var offX;
	var offY;

	function addListeners(){
		document.getElementById('DragQueen').addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);
	}

	function mouseUp(){
		window.removeEventListener('mousemove', divMove, true);
	}

	function mouseDown(e){
		var div = document.getElementById('DragQueen');
		offY = e.clientY-parseInt(div.offsetTop);
		offX = e.clientX-parseInt(div.offsetLeft);
		window.addEventListener('mousemove', divMove, true);
	}

	function divMove(e){
		var div = document.getElementById('DragQueen');
		div.style.position = 'absolute';
		div.style.top = (e.clientY-offY) + 'px';
		div.style.left = (e.clientX-offX) + 'px';
	}

	addListeners();

	function addEvent(node, ename, handler)
	{
		if(typeof document.addEventListener != 'undefined')
		{
			node.addEventListener(ename, handler, false);
		}
		else if(typeof document.attachEvent != 'undefined')
		{
			node.attachEvent('on' + ename, handler);
		}
	}
});
