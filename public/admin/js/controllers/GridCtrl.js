
EasyPress.controller('GridController', ['$scope', function($scope) {

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

		$scope.active.element.append(row);
		$scope.active.branch['row-' + nextRow] = {};
		$scope.active.branch = $scope.active.branch['row-' + nextRow];

		var newElements = $('#row-' + nextRow + ' > div:not(".clearfix")');

		for (var i = 0; i < newElements.length; i++) {
			$scope.active.branch[newElements[i].id] = {};
		}

		$scope.active.element = $('#' + newElements[0].id);
		$scope.active.branch = $scope.active.branch[newElements[0].id];

		nextRow++;
		$scope.setMenu("main_menu");
	};

	var nextContainer = 1;
	$scope.addContainer = function(className) {
		var container = $('<div id="' + className + '-' + (className == 'row' ? nextRow : nextContainer) + '" class="' + className + '"></div>');
		$scope.active.element.append(container);
		$scope.active.branch[className + '-' + (className == 'row' ? nextRow : nextContainer)] = {};
		$scope.active.branch = $scope.active.branch[className + '-' + (className == 'row' ? nextRow++ : nextContainer++)];
		$scope.active.element = container;
	};
				
}]);
