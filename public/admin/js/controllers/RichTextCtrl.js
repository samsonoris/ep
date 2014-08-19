
EasyPress.controller('RichTextController', ['$scope','$http','$element','ContentService',function($scope,$http,$element,ContentService){

	$scope.user = {name: "Marita"};
	$scope.blog = $scope.active.element.nodeName == 'BLOG-POST';
	$scope.editable = $scope.active.element.getAttribute('contenteditable');

	if ($scope.blog) {
		ContentService.setActiveBlog($scope.active.element); 
		var childs = $scope.active.element.children;
		for (var i in childs) {
			if (childs[i].nodeName == "ARTICLE") {
				$scope.setActive(childs[i]);
				break;
			}
		}
	}

	$scope.saveBlog = function(){
		console.log("in func!");
		
		$http({
			url: '/make-blog-post',
			method: 'POST',
			data: {
				name: ContentService.getBlogName(),
				author: $scope.user.name,
				blog: ContentService.getBlogHTML()
			},
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	$scope.publishBlog = function(){
		$http({
			url: '/publish-blog/' + elem.blogID,//fix!
			method: 'POST'
		});
	};

}]);
