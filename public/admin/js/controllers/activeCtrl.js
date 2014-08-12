
EasyPress.controller('activeElementController',['$scope', function($scope){

	console.log("In active ctrl..");

	$scope.setActive = function(id) {
		$scope.activeElement = $('#' + id);
		$scope.activeString = id;
		$scope.activeBranch = $scope.$parent.elements["MainContent"];
		$("#MainContent").find("*").css({"outline":"none"}).attr('contenteditable','inherit');
		if (id != "MainContent") {
			$scope.activeElement.css({"outline":"green solid thin"}).attr('contenteditable','true').focus();
			document.execCommand('styleWithCss',false,true);
			var map = [id];
			var elem = $scope.activeElement.get(0).parentNode;
			while (elem.id != "MainContent") {
				map.unshift(elem.id);
				elem = elem.parentNode;
			}
			map.forEach(function(node){
				$scope.activeBranch = $scope.$parent.activeBranch[node];
			});
		}
		$scope.$parent.$parent.dragMenu = "admin/templates/creator.html";
		console.log("In setActive: ",$scope.dragMenu);
	};

}]);
