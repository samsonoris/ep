
EasyPress.controller('NavController',['$scope',function($scope){

	var navItems = 0;
	var navCollapses = 1;
	$scope.currentNav = 'navbar';
	$scope.addNavItem = function(){
		$('#navitems').append(
			'<div class="btn-group">' +
			'<label>Text:<input id="nav-text-' + navItems + '" type="text"></label>' +
			'<label>Url:<input id="nav-url-' + navItems + '" type="text"></label>' +
			'<label><input type="checkbox">Float right</label>' +
			'</div>'
		);	
		navItems += 1;
	};

	$scope.appendBootstrap = function(element){
		console.log("in append Bootstrap...");
		if (element == 'nav') {
			console.log("condition...");
			var navbar = $('<div role="navigation" class="navbar ' + $('input[name="nav-color"]:checked').val() + " " + $('input[name="nav-placement"]:checked').val() + '"></div>');
			if ( $('input[name="navbar-header"]').is(':checked') ) {
				var header = '<div class="navbar-header">'
				if ( $('input[name="navbar-collapse"]').is(':checked') ) {
					header += '<button type="button" data-target="#navbarCollapse-' + navCollapses + '" data-toggle="collapse" class="navbar-toggle">' +
						'<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
				}
				if ( $('input[name="navbar-brand"]').is(':checked') ) {
					header += '<a href="' + $('input[name="brand-url"]').val() + '" class="navbar-brand">' + $('input[name="brand-name"]').val() + '</a>';
				}
				header += '<div>';
				navbar.append($(header));
			}
			list = '<ul class="nav navbar-nav">';
			var navels = $('#navitems').children();
			for (var i=0; i < navels.length; i++) {
				list += '<li><a href="' + $('#nav-url-' + i).val() + '">' + $('#nav-text-' + i).val() + '</a></li>'; 
			}
			list += '</ul>';
			if ( $('input[name="navbar-collapse"]').is(':checked') ) {
				list = '<div id="navbarCollapse-' + navCollapses + '" class="collapse navbar-collapse">' + list + '</div>';
			}
			navbar.append($(list));
		}
		$scope.active.element.append(navbar)
	};
}]);

