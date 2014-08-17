'use strict';

angular.module('blogger', [
	'blogger.directives',
	'blogger.controllers'
]);

angular.module('blogger.directives',[]);
angular.module('blogger.directives')
	.directive('blogContainer', ['$http', function($http){
		console.log("In container directive");

		return {
			restrict: 'AE',
			controller: 'BlogController',
			link: function(scope,elem,attrs){
				/*
				$http({
					url: '/make-blog-db',
					method: 'POST',
					data: { name: attrs.name },
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function(data){

				}).error(function(data){

				});*/
			},
			template: '<div ng-repeat="blog in blogs" ng-controller="BlogController">{{blog}}</div>'
		}
	}])

	.directive('blogPost',['$http',function($http){
		console.log("In blog post directive");
		return {
			restrict: 'AE',
			link: function(scope,elem,attrs){
				scope.user = {name: "Marita"};
				scope.authors = elem[0].parentNode.getAttribute('authors');
				scope.name = elem[0].parentNode.getAttribute('name');
				scope.social = elem[0].parentNode.getAttribute('social');
				scope.showTitle = elem[0].parentNode.getAttribute('show-title') || false;
				scope.dateFormat = elem[0].parentNode.getAttribute('date-format') || false;
				console.log("social: ",scope.social,"title: ",scope.showTitle,"scope.user: ",scope.user);
			},
			template: '<div class="blog-author" ng-if="authors.indexOf(user.name) != -1"><button class="btn btn-success" ng-click="saveBlog">Save</button><button class="btn btn-success" ng-click="publishBlog">Publish</button></div><div class="blogHead"><span ng-if="showTitle">Title is here</span><span class="blogDate">Date</span></div><div ng-if="social">Social Media Links</div><article>Blog text</article>'
		}
	}]);

angular.module('blogger.controllers',[]);
angular.module('blogger.controllers')
	.controller('BlogController', ['$scope','$element','$http',function($scope,$element,$http){

		$scope.authors = $element[0].getAttribute('authors');
		$scope.url = $element[0].getAttribute('blog-url');
		$scope.name = $element[0].getAttribute('name');
		$scope.social = $element[0].getAttribute('social');
		$scope.dateFormat = $element[0].getAttribute('dateFormat');
		$scope.showTitle = $element[0].getAttribute('showTitle');
/*
		$http.get('/blog/' + $element.getAttribute('name'))
			.success(function(data){
				$scope.blogs = data;
			})
			.error(function(data){
				$scope.blogs = ["Error: Contact site administrator"];
			});

*/
		console.log(
			"\nAuthors: ", $element[0].getAttribute('authors'),
			"\nblogUrl: ", $element[0].getAttribute('blog-url'),
			"\nname: ", $element[0].getAttribute('name'),
			"\nsocial: ", $element[0].getAttribute('social'),
			"\ndateFormat: ", $element[0].getAttribute('dateFormat'),
			"\nshowTitle: ", $element[0].getAttribute('showTitle')
		);
	}]);

/*
			scope: {
				"authors": "=",
				"url": "=url",
				"name": "=name",
				"social": "=",
				"dateFormat": "=",
				"showTitle": "="
			},
			link: function(scope,elem,attrs){
				console.log("in container link function,scope:",scope,"elem:",elem,"attrs:",attrs);
			},
*/
