

EasyPress.controller("StyleController", ['$scope', function($scope) {

	$scope.currentStyle = 'position';

	$scope.elemProps = {};
	elem = $scope.active.element.get(0);
	$scope.elemProps.id = elem.id;
	$scope.elemProps.class = elem.className;
	for (var i in elem.style) {
		if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
			$scope.elemProps[i] = typeof elem.style[i] == "number" ? elem.style[i].toString() : elem.style[i];
		}
	}

	$scope.setProperties = function() {
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
