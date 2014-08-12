
EasyPress.controller('MenuController', ['$scope', function($scope){

	var elementCount = {
		//HTML
		"article": 1,
		"img": 1,
		//Bootstrap	
		"navbar": 1
	};

	$scope.setActive = function(id) {
		$scope.active.element = $('#' + id);
		$scope.active.branch = $scope.tree["MainContent"];
		$("#MainContent").find("*").css({"outline":"none"}).attr('contenteditable','inherit');
		if (id != "MainContent") {
			$scope.active.element.css({"outline":"green solid thin"}).attr('contenteditable','true').focus();
			document.execCommand('styleWithCss',false,true);
			var map = [id];
			var elem = $scope.active.element.get(0).parentNode;
			while (elem.id != "MainContent") {
				map.unshift(elem.id);
				elem = elem.parentNode;
			}
			map.forEach(function(node){
				$scope.active.branch = $scope.active.branch[node];
			});
		}
		$scope.setMenu("main_menu");
	};

	$scope.currentBootstrap = "admin/templates/navbar.html";

	$scope.append = function(element) {
		var elem = $("<" + element + " id='" + element + elementCount[element]++ + "'></" + element + ">");
		elem.appendTo($scope.active.element);
		$scope.active.branch[elem.get(0).id] = {};
		$scope.active.branch = $scope.active.branch[elem.get(0).id];
		$scope.setActive(elem.attr('id'));
		$scope.active.element = elem;
		$scope.setMenu('style');
	};

	$scope.doCommand = function(command,argument){
		if (command == 'insertImage') {
			argument = '../images/' + prompt('Submit the name of the image file:');
		}
		document.execCommand(command,false,argument);
		$scope.active.element.focus();
	};

}]);
