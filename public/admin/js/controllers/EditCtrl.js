
EasyPress.controller('EditController', function($scope) {

	$scope.$parent.title = "Ep-admin Edit";

	$scope.activeElement = $('.container');
	$scope.elements = {
		"MainContent": {}
	};
	var activeBranch = $scope.elements["MainContent"];
	$scope.elemProps = {};
	articleCount = 1;

	$scope.$watch('activeElement',function(){
		$scope.activeString = $scope.activeElement.attr("id");
	});

	$scope.setActive = function(id) {
		$scope.activeElement = $('#' + id);
		$("*").css({"outline":"none"}).attr('contenteditable','false');
		$scope.activeElement.css({"outline":"green solid thin"}).attr('contenteditable','true').focus();
		$scope.activeString = id;
		activeBranch = $scope.elements["MainContent"];
		if (id != "MainContent") {
			var map = [id];
			var elem = $scope.activeElement.get(0).parentNode;
			while (elem.id != "MainContent") {
				map.unshift(elem.id);
				elem = elem.parentNode;
			}
			map.forEach(function(node){
				activeBranch = activeBranch[node];
			});
		}
		$scope.pickElem = false;
		$scope.creator = true;
	};

	$scope.prepareElement = function(elem) {
		elem = elem.get(0);
		$scope.elemProps.id = elem.id;
		$scope.elemProps.class = elem.className;
		for (var i in elem.style) {
			if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
				$scope.elemProps[i] = typeof elem.style[i] == "number" ? elem.style[i].toString() : elem.style[i];
			}
		}
	};

	$scope.setProperties = function() {
		$scope.editElem = false;
		$scope.creator = true;
	};

	$scope.creator = true;
	$scope.gridMaker = false;
	$scope.editElem = false;
	$scope.editor = false;

	$scope.append = function(element) {
		var elem = $("<" + element + " id='" + element + articleCount++ + "'></" + element + ">");
		elem.appendTo($scope.activeElement);
		activeBranch[elem.get(0).id] = {};
		activeBranch = activeBranch[elem.get(0).id];
		$scope.setActive(elem.attr('id'));
		$scope.activeElement = elem;
		$scope.prepareElement(elem);
		$scope.creator = false;
		$scope.editElem = true;
	};

	$scope.doCommand = function(command,argument){
		document.execCommand(command,false,argument);
		$scope.activeElement.focus();
	};

	var nextRow = 1;
	$scope.makeRow = function() {
		var nextBox = 1;
		var row = "<div id='row-" + nextRow + "' class='row'>";
		var columns = $('input[name="columns"]').val();
		var sm = $('input[name="col-sm"').val();
		var md = $('input[name="col-md"').val();
		var lg = $('input[name="col-lg"').val();
		var smrow,smstr,mdrow,mdstr,lgrow,lgstr;
		if (sm) { smrow = 12 / sm; smstr = ' col-sm-' + smrow; }
		if (md) { mdrow = 12 / md; mdstr = ' col-md-' + mdrow; }
		if (lg) { lgrow = 12 / lg; lgstr = ' col-lg-' + lgrow; }
		for (i = 0; i < columns; i++) {
			row += "<div id='row-" + nextRow + "-box-" + nextBox++ + "' class='" + smstr + mdstr + lgstr + "'></div>";
			if (sm && (i+1) % sm === 0) {
				row += '<div class="clearfix visible-sm-block"></div>';
			}
			if (md && (i+1) % md === 0) {
				row += '<div class="clearfix visible-md-block"></div>';
			}
			if (lg && (i+1) % lg === 0) {
				row += '<div class="clearfix visible-lg-block"></div>';
			}
		}
		row += '</div>';
		row = $(row);
		$scope.activeElement.append(row);
		var newElements = $('#row-' + nextRow + ' > div:not(".clearfix")');
		$scope.elements.push('row-' + nextRow);
		for (var i = 0; i < newElements.length; i++) {
			$scope.elements.push(newElements[i].id);
			$scope.subElements[newElements[i].id] = {};
		}
		nextRow++;
		$scope.gridMaker = false;
		$scope.creator = true;
	};

	// Drag box
	var offX;
	var offY;

	function addListeners(){
		document.getElementById('dragme').addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);
	}

	function mouseUp(){
		window.removeEventListener('mousemove', divMove, true);
	}

	function mouseDown(e){
		var div = document.getElementById('dragme');
		offY = e.clientY-parseInt(div.offsetTop);
		offX = e.clientX-parseInt(div.offsetLeft);
		window.addEventListener('mousemove', divMove, true);
	}

	function divMove(e){
		var div = document.getElementById('dragme');
		div.style.position = 'absolute';
		div.style.top = (e.clientY-offY) + 'px';
		div.style.left = (e.clientX-offX) + 'px';
	}

	addListeners();

	$(document).on('focus','.editable',function(){
		console.log("On focus",$(this));
		$scope.activeElement = $(this);
		document.execCommand('styleWithCss',false,true);
	});

	console.log(activeBranch);
});
