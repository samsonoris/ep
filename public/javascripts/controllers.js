'use strict';

controllers = angular.module('controllers',[]).

controller('EpCtrl',['$scope','$location', function($scope,$location){
	//$location.path('admin/edit');
	console.log("In controller.");
}]).

controller('EditCtrl',['$scope', function($scope){
	console.log("In edit controller");
}]).

controller('ArchiveCtrl',['$scope', function($scope){

}]).

controller('ViewCtrl',['$scope', function($scope){

}]);

console.log("In controllers.js");
