

EasyPress.controller("StyleController", ['$scope','upload', function($scope) {

	console.log("In style controller...");

	$scope.currentStyle = 'position';
	$scope.uploadSuccess = function(response, field) {
		console.log("Response: ", response, "\nField: ", field);
		$scope[field] = response.data.file;
	};

	$scope.getev = function(){
		console.log("change");
	};

	var elem = $scope.active.element;
	$scope.selector = elem.id ? "#" + elem.id : ( elem.className ? "." + elem.className : elem.nodeName.toLowerCase() );

	var css = window.getComputedStyle(elem);

	for (var i in css) {
		if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
			$scope[i] = css.getPropertyValue(i);
		}
	}

	$scope.setProperties = function(elem) {
		//console.log("Setting properties...", $scope.active.element, $scope.backgroundColor);
		
		var rules = "";

		angular.forEach($scope.positionForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				rules += key + ":" + value.$modelValue + ";";
			}
		});

		angular.forEach($scope.backgroundForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				$scope.applyStyle(selector,key,value.$modelValue);
				return;
			}
		});

		angular.forEach($scope.dimensionForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				rules += key + ":" + value.$modelValue + ";";
			}
		});

		angular.forEach($scope.borderForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				rules += key + ":" + value.$modelValue + ";";
			}
		});

		//$scope.applyStyle(selector,rules);
		$scope.setMenu("main_menu");

	};

	$scope.themes = {
		'Amelia (Default)': 'amelia.css',
		'Cerulean': 'cerulean.css',
		'Cosmo': 'cosmo.css',
		'Cyborg': 'cyborg.css',
		'Darkly': 'darkly.css',
		'Flatly': 'flatly.css',
		'Journal': 'journal.css',
		'Lumen': 'lumen.css',
		'Readable': 'readable.css',
		'Simplex': 'simplex.css',
		'Slate': 'slate.css',
		'Spacelab': 'spacelab.css',
		'Superhero': 'superhero.css'
		};

}]);
