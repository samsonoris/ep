
EasyPress.controller('AddBlogController',['$scope','$compile',function($scope,$compile){

	$scope.authors = [];

	$scope.createBlogPost = function(s,d,h){
		var blog = document.createElement('blog-post');
		$scope.active.element.appendChild(blog);
		$compile(blog)($scope);
		$scope.setMenu('main_menu');
	}

	$scope.createBlogModule = function(blog){
		var bc = document.createElement('blog-container');
		bc.setAttribute('blog-url','/blog/');
		bc.setAttribute('name',$scope.blog.name);
		bc.setAttribute('authors',$scope.authors);
		bc.setAttribute('social',$scope.blog.social || false);
		bc.setAttribute('date-format',$scope.blog.dateFormat);
		bc.setAttribute('show-title',$scope.blog.showTitle || false);
		bc.setAttribute('ng-controller','BlogController');
		$scope.active.element.appendChild(bc);
		$compile(bc)($scope);
	}

}]);
