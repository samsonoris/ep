

EasyPress.controller("StyleController", ['$scope','upload', function($scope) {

	console.log("In style controller...");

	$scope.currentStyle = 'position';
	$scope.uploadSuccess = function(response, field) {
		console.log("Response: ", response, "\nField: ", field);
		$scope[field] = response.data.file;
	};

	$scope.elemProps = {};
	elem = $scope.active.element;
	$scope.elemProps.id = elem.id;
	$scope.elemProps.class = elem.className;
	var css = window.getComputedStyle(elem);

	for (var i in elem.style) {
		if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
			$scope[i] = css.getPropertyValue(i);
		}
	}

	$scope.setProperties = function() {
		console.log("Setting properties...", $scope.active.element, $scope.backgroundColor);

		angular.forEach($scope.positionForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				console.log("Setting: ", key, " to ", value.$modelValue);
				$scope.active.element.style[key] = value.$modelValue;
			}
		});

		angular.forEach($scope.backgroundForm, function(value, key) {
			console.log("In backgroundForm\nkey = ",key,"\nvalue = ", value.$modelValue,"\npristine? ",value.$pristine);
			if (key[0] == '$') return;
			if (!value.$pristine) {
				console.log("Setting: ", key, " to ", value.$modelValue);
				$scope.active.element.style[key] = value.$modelValue;
			}
		});

		angular.forEach($scope.dimensionForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				console.log("Setting: ", key, " to ", value.$modelValue);
				$scope.active.element.style[key] = value.$modelValue;
			}
		});

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
