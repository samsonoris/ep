
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', ['$scope', '$http', function($scope, $http) {

	$scope.title;
	console.log("IN MAIN CTRL!");

	$scope.setUpTarget = function() {
		$scope.TARGET_DOCUMENT = document.getElementById('MainContent').contentDocument;
		$scope.TARGET_HEAD = $scope.TARGET_DOCUMENT.getElementsByTagName('head')[0];
		$scope.TARGET_BODY = $scope.TARGET_DOCUMENT.getElementsByTagName('body')[0];
		$scope.TARGET_STYLE = document.createElement('style');
		$scope.TARGET_STYLE.type = 'text/css';
		$scope.TARGET_HEAD.appendChild($scope.TARGET_STYLE);
	}

  	$scope.setTheme = function(fileName){
    	document.head.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
		$scope.TARGET_HEAD.getElementsByClassName('theme')[0].href = "/admin/css/custom-theme/" + fileName;
  	};

	$scope.removeElement = function(element) {
		var parent = element.parentNode;
		parent.removeChild(element);
	};


}]);
