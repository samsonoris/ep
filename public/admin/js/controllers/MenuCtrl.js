
EasyPress.controller('MenuController', ['$scope','$compile','BloggerService', function($scope,$compile,BloggerService){

	// Tree view controller
	$scope.opaque = new RegExp(/navbar|blog-module/);

	// Create blog
	$scope.authors = [];
	$scope.createBlogModule = function(module){
		module.authors = $scope.authors;
		var bm = BloggerService.createModule(module,'C');
		console.log(bm);
		$scope.active.element.appendChild(bm);
		$compile(bm)(angular.element($scope.active.element).scope());
		$scope.setActive(bm);
	}

	$scope.createBlogPost = function(){
		//Empty blog
		var blog = {
			title: "Title",
			blog: ""
		};
		BloggerService.createPost($scope.active.element,blog);
	};


}]);
