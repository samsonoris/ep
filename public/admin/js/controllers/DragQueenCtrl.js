
EasyPress.controller('DragQueenController', function($scope) {



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
		switch(dir) {
			case "up":
				$scope.setActive($scope.active.element.previousElementSibling)
				break;
			case "left":
				if ($scope.active.element.nodeName !== "BODY")
					$scope.setActive($scope.active.element.parentNode);
				break;
			case "right":
				if ($scope.active.element.children.length)
					$scope.setActive($scope.active.element.children[0]);
				break;
			case "down":
				$scope.setActive($scope.active.element.nextElementSibling)
				break;
			case "home":
				$scope.setActive($scope.TARGET_BODY);
				break;
		}
	};

	// EVENT HANDLERS //
	
	// Keybindings for navigation (and other things)
	
	function keyDown(e){
		e = e ? e : window.event;
		$scope.keyIsDown = e.keyCode;
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
				break;
		}
		$scope.$apply();
	}

	// When hovering over the arrow buttons (navigation interface)
	// the target element will be highlighted as candidate for selection
	
	function navigationHint(e){
		e = e ? e : window.event;
		var targ;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		dir = targ.className.match(/hint-(up|left|right|down|home)/);
		var active = $scope.active.element;
		
		if (dir) switch (dir[1]) {
			case "up":
				if (active.nodeName !== "BODY" && active.previousElementSibling)
					$scope.setCandidate(active.previousElementSibling);
				break;
			case "left":
				if (active.nodeName !== "BODY" && active.parentNode)
					$scope.setCandidate(active.parentNode);
				break;
			case "right":
				if (active.children.length)
					$scope.setCandidate(active.children[0]);
				break;
			case "down":
				if (active.nextElementSibling)
					$scope.setCandidate(active.nextElementSibling);
				break;
		}
	}		

	function navigationHintOff(e){
		$scope.resetOutlines();
	}

	// Only debug/devel-tool
	function keyUp(e){
		setTimeout(function(){
			$scope.keyIsDown = null;
			$scope.$apply()
		},1000);
	}

	var offX;
	var offY;

	$scope.addEvent(document.getElementById('DragQueen'),'mouseover', mouseEnter, true);
	$scope.addEvent(document.getElementById('DragQueen'),'mousedown', mouseDown);
	$scope.addEvent(window,'mouseup', mouseUp);

	var directions = document.getElementsByClassName('navigator-hint');
	for (var i = 0; i < 4; i++) {
		$scope.addEvent(directions[i],'mouseover', navigationHint, true);
		$scope.addEvent(directions[i],'mouseout', navigationHintOff, true);
	}

	$scope.addEvent(window,'keydown',keyDown);
	$scope.addEvent(window,'keyup',keyUp);

	function mouseEnter(e) {
		// When mouse enter DragQueen the hover-highlighted element should restore to normal
		$scope.resetOutlines();
	}

	function mouseDown(e){
		// Hide all mouseevents from iframe by sinking it below shielding div
		document.getElementById('MainContent').style.zIndex = -1000;

		var div = document.getElementById('DragQueen');
		offY = e.clientY-parseInt(div.offsetTop, 10);
		offX = e.clientX-parseInt(div.offsetLeft, 10);
		$scope.addEvent(window,'mousemove',divMove, true);
		$scope.addEvent(document,'mouseout',divRelease);
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
});
