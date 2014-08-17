
EasyPress.controller('AddBlogController',['$scope','$compile',function($scope,$compile){

	$scope.authors = [];

	$scope.createBlog = function(s,d,h){
		var blog = document.createElement('blog');
		blog.setAttribute('social',s ? true : false);
		blog.setAttribute('dateFormat','"' + d + '"'); 
		blog.setAttribute('heading', '"' + h + '"');
		$scope.active.element.appendChild(blog);
		$compile(blog)($scope);
		$scope.setMenu('main_menu');
	}

	$scope.createBlogModule = function(blog){
		var bc = document.createElement('blog-container');
		$scope.active.element.appendChild(bc);
		$compile(bc)($scope);
	}

	$scope.getValues = function(){
		$scope.blog.url = '/blog';
		$scope.blog.authors = $scope.authors;
		return $scope.blog;
	};

}]);
