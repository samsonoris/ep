
EasyPress.controller('MenuController', ['$scope','$compile','BloggerService', function($scope,$compile,BloggerService){

	var elementCount = {
		//HTML
		"article": 1,
		"img": 1,
		//Bootstrap	
		"navbar": 1
	};

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

	$scope.append = function(element) {
		var elem = document.createElement(element);
		elem.id = element + elementCount[element]++;
		$scope.active.element.appendChild(elem);
		$scope.setActive(elem);
		//$scope.setMenu('style');
	};


	$scope.doCommand = function(command,argument){
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		document.execCommand(command,false,argument);
		$scope.active.element.focus();
	};

}]);
