
EasyPress.controller('DragQueenController', function($scope) {

	$scope.$parent.title = "Ep-admin Edit";

	$scope.tree = {
		"MainContent": {}
	};

	$scope.active = {
		"element": $('#MainContent'),
		"string": "MainContent",
		"branch": $scope.tree["MainContent"]
	};

	$scope.$watch('active.element',function() {
		$scope.active.string = $scope.active.element.attr("id");
	});

	var menuItems = {
		"main_menu": "admin/templates/main_menu.html",
			 "tree": "admin/templates/tree.html",
			"style": "admin/templates/style.html",
			 "grid": "admin/templates/grid.html",
		"bootstrap": "admin/templates/bootstrap.html",
			 "html": "admin/templates/html.html",
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

});
