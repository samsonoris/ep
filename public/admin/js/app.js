
var EasyPress = angular.module('EasyPress',['ngRoute']).

config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	console.log("In appRoutes");
	$routeProvider

		// home page
		.when('/admin', {
			templateUrl:'admin/partials/login.html',
			controller:'EditController'
		})

	$locationProvider.html5Mode(true);
}]);

