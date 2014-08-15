
EasyPress.controller('MenuController', ['$scope', function($scope){

	var elementCount = {
		//HTML
		"article": 1,
		"img": 1,
		//Bootstrap	
		"navbar": 1
	};


	$scope.append = function(element) {
		var elem = document.createElement(element);
		elem.id = element + elementCount[element]++;
		$scope.active.element.appendChild(elem);
		$scope.setActive(elem);
		//$scope.setMenu('style');
	};

	$scope.doCommand = function(command,argument){
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		document.execCommand(command,false,argument);
		$scope.active.element.focus();
	};

}]);
