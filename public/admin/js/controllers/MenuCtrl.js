
EasyPress.controller('MenuController', ['$scope','$compile', function($scope,$compile){

	var elementCount = {
		//HTML
		"article": 1,
		"img": 1,
		//Bootstrap	
		"navbar": 1
	};


	$scope.append = function(element) {
		var elem = document.createElement(element);
		elem.id = element + elementCount[element]++;
		$scope.active.element.appendChild(elem);
		$scope.setActive(elem);
		//$scope.setMenu('style');
	};

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
		console.log("blog: ",blog);
		bc.setAttribute('name',blog.name);
		bc.setAttribute('blog-url',blog.url);
		$scope.active.element.appendChild(bc);
		$compile(bc)($scope);
	}

	$scope.doCommand = function(command,argument){
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		document.execCommand(command,false,argument);
		$scope.active.element.focus();
	};

}]);
