
EasyPress.controller('RichTextController', ['$scope','$http','ContentService',function($scope,$http,ContentService){

	console.log("in editor...",$scope.active.element);


	$scope.Editor = new Medium({
		debug: true,
		element: $scope.active.element,
		modifier: 'auto',
		autofocus: "auto",
		autoHR: true,
		mode: Medium.richMode,
		modifiers: {
			'b': 'bold',
			'i': 'italic',
			'u': 'underline',
			'p': 'paste'
		},
		tags: {
			break: 'br',
			horizontalRule: 'hr',
			paragraph: 'p',
			outerLevel: ['pre','blockquote','figure'],
			innerLevel: ['a','b','u','i','img','strong']
		},
		attributes: {
			remove: []
		},
		pasteAsText: true,
		beforeInvokeElement: function() {

		},
		beforeInsertHtml: function() {

		},
		beforeAddTag: function(tag, shouldFocus, isEditable, afterElement) {
		
		},
		keyContext: {
			27: exitEditor
		}
	});

	$scope.blog = $scope.active.element.nodeName == 'BLOG-POST';

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

	/*
	$scope.doCommand = function(command,argument){
		console.log("in func..");
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		$scope.TARGET_DOCUMENT.execCommand(command,false,argument);
		$scope.active.element.focus();
	};
*/
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

	function exitEditor(){
		console.log("ESC pressed...");
		Editor.destroy();
		$scope.addEvent(window,'keydown',$scope.keyDown,true);
		$scope.setMenu('main');
	}

}]);
