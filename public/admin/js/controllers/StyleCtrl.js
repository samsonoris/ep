

EasyPress.controller("StyleController", ['$scope','upload', function($scope) {

	console.log("In style controller...");

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

	$scope.setTheme = function(fileName){
		document.head.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		$scope.TARGET_HEAD.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
  	};

	$scope.styleCategories = {
		"position": "admin/templates/style/position.html",	
		"margin": "admin/templates/style/margin.html",	
		"dimension": "admin/templates/style/dimension.html",	
		"display": "admin/templates/style/display.html",	
		"background": "admin/templates/style/background.html",	
		"border": "admin/templates/style/border.html",	
		"text": "admin/templates/style/text.html",	
		"font": "admin/templates/style/font.html"	
	};

	$scope.setStyle = function(choice){
		$scope.currentStyle = $scope.styleCategories[choice];
	};
	$scope.setStyle('position');
	


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

}]);
