
EasyPress.controller('RichTextController', ['$scope','$http','ContentService',function($scope,$http,ContentService){

	console.log("in editor...");

	$scope.removeEvent($scope.TARGET_WINDOW,'keydown',$scope.keyDown);
	$scope.removeEvent(document,'keydown',$scope.keyDown);
	var elem = $scope.active.element;
	var Medium = $scope.TARGET_WINDOW.Medium;
	editor = new Medium({
		debug: true,
		element: elem,
		mode: Medium.inlineRichMode,
		keyContext: {
			27: function exitEditor(){
					console.log("ESC pressed...context");
					elem.removeAttribute('spellcheck');
					editor.destroy();
					$scope.addEvent($scope.TARGET_WINDOW,'keydown',$scope.keyDown);
					$scope.addEvent(document,'keydown',$scope.keyDown);
					$scope.setMenu('main');
					$scope.$apply();
			}
		},
		tags: {
			break: 'br',
			horizontalRule: 'hr',
			paragraph: 'p',
			outerLevel: ['pre','blockquote','figure'],
			innerLevel: ['a','b','u','i','img','strong']
		},
		beforeInvokeElement: function() {
			console.log("In before invoke");
		},
		modifier: 'Ctrl',
		modifiers: {
			'b': 'bold',
			'i': 'italicize',
			'u': 'underline',
			'v': 'paste'
		},
		pasteAsText: true,
		autoHR: true,
		attributes: {
			remove: []
		},
		beforeInsertHtml: function() {

		},
		beforeAddTag: function(tag, shouldFocus, isEditable, afterElement) {
		
		}
	});
 
	elem.focus();
	elem.spellcheck = false;
	
	console.log(editor);
	
	$scope.doCommand = function(command,argument){
		console.log("in func, command: ", command);
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		switch (command) {
			case 'b':
			case 'i':
			case 'u':
				editor.invokeElement(command,{});
				break;
		}
		elem.focus();
		return false;
	};

/*
	$scope.blog = (elem.nodeName == 'BLOG-POST');

	if ($scope.blog) {
		ContentService.setActiveBlog(elem); 
		var childs = elem.children;
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

*/

}]);
