
EasyPress.controller('RichTextController', ['$scope','$http','ContentService',function($scope,$http,ContentService){

	var elem = $scope.active.element;
	var Medium = $scope.TARGET_WINDOW.Medium;
	$scope.removeEvent($scope.TARGET_WINDOW,'keydown',$scope.keyDown);

	console.log("in editor...");
	elem.focus();
	elem.spellcheck = false;

	$scope.Editor = new Medium({
		debug: true,
		element: elem,
		mode: Medium.inlineRichMode,
		keyContext: {
			27: exitEditor
		}
	}).focus();

	console.log($scope.Editor.behavior());
/*
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
		modifiers: {
			'b': 'bold',
			'i': 'italicize',
			'u': 'underline',
			'p': 'paste'
		},
		pasteAsText: true,
		autoHR: true,
		attributes: {
			remove: []
		},
		beforeInsertHtml: function() {

		},
		beforeAddTag: function(tag, shouldFocus, isEditable, afterElement) {
		
		},
 
   */
	$scope.blog = elem.nodeName == 'BLOG-POST';

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

	/*
	$scope.doCommand = function(command,argument){
		console.log("in func..");
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		$scope.TARGET_DOCUMENT.execCommand(command,false,argument);
		elem.focus();
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
		console.log("ESC pressed...context");
		elem.removeAttribute('spellcheck');
		$scope.Editor.destroy();
		$scope.addEvent($scope.TARGET_WINDOW,'keydown',$scope.keyDown);
		$scope.setMenu('main');
		$scope.$apply();
	}

}]);
