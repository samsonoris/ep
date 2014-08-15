
EasyPress.controller('BootstrapController', ['$scope', function($scope) {

	var bootstrapItems = {
	   		"nav": "admin/templates/navbar.html",
		  "panel": "admin/templates/panel.html"
	};

	$scope.setBootstrapMenu = function(menu) {
		$scope.bootTab = menu;
		$scope.currentBootstrap = bootstrapItems[menu];
	};
	$scope.setBootstrapMenu('nav');

}]);
