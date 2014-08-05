'use strict';

var EasyPress = angular.module('EasyPress',[
		'ngRoute',
		'controllers',
		'services'
]).

config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	console.log("In config");
	$routeProvider.
		when('/',{
			templateUrl:'views/edit.html',
			controller:'EditCtrl'
		}).
		when('/archive',{
			templateUrl:'partials/archive.html',
			controller:'ArchiveCtrl'
		}).
		when('/view',{
			templateUrl:'partials/view.html',
			controller:'ViewCtrl'
		}).
		otherwise({
			redirectTo:'/'
		});
}]);

