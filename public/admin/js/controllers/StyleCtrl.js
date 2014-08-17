

EasyPress.controller("StyleController", ['$scope','upload', function($scope) {

	console.log("In style controller...");

	$scope.currentStyle = 'position';
	$scope.uploadSuccess = function(response, field) {
		console.log("Response: ", response, "\nField: ", field);
		$scope[field] = response.data.file;
	};

	var elem = $scope.active.element;
	$scope.selector = elem.id ? "#" + elem.id : ( elem.className ? "." + elem.className : elem.nodeName.toLowerCase() );

	var css = window.getComputedStyle(elem);

	for (var i in css) {
		if (typeof elem.style[i] != "function" && !i.match(/^webkit/)) {
			$scope[i] = css.getPropertyValue(i);
		}
	}



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
