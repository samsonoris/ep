 //Login controller

 EasyPress.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  $scope.$parent.title = "Log in";
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      console.log('success');
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
      $scope.wrongLogIn = "Username or password is incorrect. Please try again!";
      console.log('failed');
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
});