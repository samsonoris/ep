

EasyPress.controller("StyleController", ['$scope','upload', function($scope) {

	console.log("In style controller...");

	$scope.currentStyle = 'position';
	$scope.uploadSuccess = function(response, field) {
		console.log("Response: ", response, "\nField: ", field);
		$scope[field] = response.data.file;
	};

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
		console.log("Setting properties...", $scope.active.element, $scope.backgroundColor);

		angular.forEach($scope.positionForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				$scope.active.element.css(key,value.$modelValue);
			}
		});

		angular.forEach($scope.backgroundForm, function(value, key) {
			if (key[0] == '$') return;
			if (!value.$pristine) {
				$scope.active.element.css(key,value.$modelValue);
			}
		});

		$scope.setMenu("main_menu");

	};
	

}]);
