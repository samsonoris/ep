
EasyPress.controller('EditController', function($scope) {

	$scope.$parent.title = "Ep-admin Edit";

	$scope.activeElement = $('.container')
	$scope.elements = [$scope.activeElement.attr('id')];
	$scope.elemProps = {};
	$scope.subElements = {};

	$scope.$watch($scope.activeElement,function(){
		$scope.activeString = $scope.activeElement.attr("id");
	});

	$scope.setActive = function(id) {
		$scope.activeElement = $('#' + id);
		$scope.activeString = id;
		$scope.pickElem = false;
		$scope.creator = true;
	};

	$scope.prepareElement = function(elem) {
		console.log("In prepare element...", elem);
		elem = elem.get(0);
		console.log("elemProps: ",$scope.elemProps);
		for (var i in elem.style) {
			if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
				$scope.elemProps[i] = typeof elem.style[i] == "number" ? elem.style[i].toString() : elem.style[i];
			}
		}
		console.log("elemProps 2: ",$scope.elemProps);
		console.log($scope.elemProps);
	}

	$scope.setProperties = function() {
		console.log(
			"id: ",$('input[name="id"]').val(),
			"\nclass: ", $('input[name="class"]').val(),
			"\nborder: ", $('input[name="border"]').val()
			);
		$scope.editElem = false;
		$scope.creator = true;
	};

	$scope.creator = true;
	$scope.gridMaker = false;
	$scope.editElem = false;
	$scope.editor = false;

	$scope.append = function(element) {
		var count = $($scope.activeElement.id + ' > ' + element).length + 1;
		var elem = $("<" + element + " id='" + element + count + "' class='editable' contentEditable='true'></" + element + ">");
		elem.appendTo($scope.activeElement).focus();
		$scope.activeElement = elem;
		//$scope.subElements[$scope.activeElement.attr('id')].push();
		$scope.prepareElement(elem);
		$scope.creator = false;
		$scope.editElem = true;
	}

	$scope.doCommand = function(command,argument){
		document.execCommand(command,false,argument);
		$scope.activeElement.focus();
	}

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
			if (sm && (i+1) % sm == 0) {
				row += '<div class="clearfix visible-sm-block"></div>';
			}
			if (md && (i+1) % md == 0) {
				row += '<div class="clearfix visible-md-block"></div>';
			}
			if (lg && (i+1) % lg == 0) {
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
	}

	var mousex;
	var mousey;
	var move = false;
	var ldivx = 200;
	var ldivy = 200;
	 
	var IE = document.all?true:false;
	if (!IE) document.captureEvents(Event.MOUSEMOVE)

	function init() {
		var d = document.getElementById('dragme');
		d.onmousedown = mousedown;
		d.onmouseup = mouseup;
		d.onmousemove = mousemove;
		d.style.left = ldivx +'px';
		d.style.top = ldivy +'px';
		d.style.display = 'block';
	}

	init();
	 
	function mousedown(e) {
		document.getElementById('dragme').style.color = 'red';
		move = true;
	if (IE) {
			mousex = event.clientX + document.body.scrollLeft;
			mousey = event.clientY + document.body.scrollTop;
		}
		else {
			mousex = e.pageX; 
			mousey = e.pageY;
		}
	}
	 
	function mouseup(e) {
		document.getElementById('dragme').style.color = 'black';
		move = false;
	}
	 
	function mousemove(e) {
		if(move){
			if (IE) {
				ldivx = ldivx + event.clientX + document.body.scrollLeft - mousex;
				ldivy = ldivy + event.clientY + document.body.scrollTop - mousey;
				mousex = event.clientX + document.body.scrollLeft;
				mousey = event.clientY + document.body.scrollTop;
			} 
			else {
				ldivx = ldivx + e.pageX - mousex;
				ldivy = ldivy + e.pageY - mousey;
				mousex = e.pageX;
				mousey = e.pageY;
			}
			var d = document.getElementById('dragme');
			d.style.left = ldivx +'px';
			d.style.top = ldivy +'px';
		}
	}

	$(document).on('focus','.editable',function(){
		$scope.activeElement = $(this);
		document.execCommand('styleWithCss',false,true);
	});


});
