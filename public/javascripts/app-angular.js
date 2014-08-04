'use strict';

var EasyPress = angular.module('EasyPress',[
		'ngRoute',
		'controllers',
		'services'
]).

config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix();
	$routeProvider.
		when('/',{
			templateUrl:'edit.hjs',
			controller:'EditCtrl'
		}).
		when('/archive',{
			templateUrl:'archive.hjs',
			controller:'ArchiveCtrl'
		}).
		when('/view',{
			templateUrl:'view.hjs',
			controller:'ViewCtrl'
		}).
		otherwise({
			redirectTo:'/'
		});
}]);

