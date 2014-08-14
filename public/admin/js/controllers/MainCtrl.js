
// angular.module('MainCtrl', [])

EasyPress.controller('MainController', function($scope) {

	$scope.title;
	console.log("IN MAIN CTRL!");

  $scope.setTheme = function(fileName){
    $scope.theTheme = "/admin/css/custom-theme/" + fileName;
  };

});
