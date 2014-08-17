
var EasyPress = angular.module('EasyPress',['ngRoute','colorpicker.module','lr.upload','ui.bootstrap','blogger'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  console.log("In appRoutes");

    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          console.log("Not authenticated");
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      };
    });

    // Define all the routes
    $routeProvider

      // home page
      .when('/admin', {
        templateUrl:'admin/partials/dragqueen.html',
        controller:'DragQueenController',
        resolve: {
            loggedin: checkLoggedin
          }
      })
      .when('/login', {
          templateUrl: 'admin/partials/login.html',
          controller: 'LoginCtrl'
      });


    $locationProvider.html5Mode(true);
  }])

  // end of config()
    .run(function($rootScope, $http){
      $rootScope.message = '';

      // Logout function is available in any pages
      $rootScope.logout = function(){
        $rootScope.message = 'Logged out.';
        $http.post('/logout');
      };
    })

	.directive('livePage', function(){
		return {
			restrict: 'A',
			link: function(scope,elem,attrs){
				elem.load(scope.initSite);
			}
		};
	})

	.filter('excludeElements', function() {
		return function(nodelist) {
			var toExclude = ["BR","#text"];
			var nodeArray = [].slice.call(nodelist);
			
			for (var i = 0; i < nodeArray.length; i++) {
				if (toExclude.indexOf(nodeArray[i].nodeName) != -1) {
					console.log("Splicing: ", nodeArray[i].nodeName);
					nodeArray.splice(i,1);
					i--; //One element less
				}
			}
			return nodeArray;
		};
	}); 

