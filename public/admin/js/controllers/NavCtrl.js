
EasyPress.controller('NavController',['$scope',function($scope){

	var navItems = 0;
	var navCollapses = 1;
	$scope.currentNav = 'navbar';
	$scope.addNavItem = function(){
		$('#navItems').append(
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
			console.log("condition...nav");
			var navbar = document.createElement('div');
			var header;
			navbar.className = "navbar";
			var colorClass = document.getElementsByName('nav-color');
			for (var i = 0; i < 2; i++) {
				if (colorClass[i].checked) {
					navbar.className += " " + colorClass[i].value;
					break;
				}
			}
			var placement = document.getElementsByName('nav-placement');
			for (var i = 0; i < 3; i++) {
				if (placement[i].checked) {
					navbar.className += " " + placement[i].value;
					break;
				}
			}
			if (document.getElementsByName('navbar-header')[0].checked) {
				header = '<div class="navbar-header">'
				if (document.getElementsByName('navbar-collapse')[0].checked) {
					header += '<button type="button" data-target="#navbarCollapse-' + navCollapses + '" data-toggle="collapse" class="navbar-toggle">' +
						'<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
				}
				if ( $('input[name="navbar-brand"]').is(':checked') ) {
					header += '<a href="' + $('input[name="brand-url"]').val() + '" class="navbar-brand">' + $('input[name="brand-name"]').val() + '</a>';
				}
				header += '</div>';
			}
			var list = '<ul class="nav navbar-nav">';
			var navels = document.getElementById('navItems').children; //just getting length
			for (var i=0; i < navels.length; i++) {
				list += '<li><a href="' + document.getElementById('nav-url-' + i).value + '">' + document.getElementById('nav-text-' + i).value + '</a></li>'; 
			}
			list += '</ul>';
			if (document.getElementsByName('navbar-collapse')[0].checked) {
				list = '<div id="navbarCollapse-' + navCollapses + '" class="collapse navbar-collapse">' + list + '</div>';
			}
			navbar.innerHTML = header + list;
			$scope.active.element.insertBefore(navbar,$scope.active.element.firstChild);
			$scope.active.element = navbar;
		}

		else if (element == 'tabs') {

		}

		else if (element == 'pills') {

		}
	};
}]);

