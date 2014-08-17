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
				console.log("in link, blog : ", scope.getValues());
			},
			template: '<div ng-repeat="blog in blogs" ng-controller="BlogController">{{blog}}</div>'
		}
	}])

	.directive('blog-post',function(){
		console.log("In blog post directive");
		return {
			restrict: 'AE',
			controller: 'BlogController',
			scope: {

			},
			link: function(scope,elem,attrs){
				console.log("in link function,scope:",scope,"elem:",elem,"attrs:",attrs);
			},
			template: '<div class="blogHead"><span ng-if="author">Author</span><span class="blogDate">Date</span></div><div ng-if="social">Social Media Links</div><article>Blog text</article>'
		}
	});

angular.module('blogger.controllers',[]);
angular.module('blogger.controllers')
	.controller('BlogController', ['$scope','$element','$http',function($scope,$element,$http){
		/*
		$scope.social = $element[0].getAttribute('social');
		$scope.authors = $element[0].getAttribute('authors');

		$http.get('/blog/' + $element.getAttribute('name'))
			.success(function(data){
				$scope.blogs = data;
			})
			.error(function(data){
				$scope.blogs = ["Error: Contact site administrator"];
			});


		/*
		console.log(
			"Authors: ", $element[0].getAttribute('authors'),
			"blogUrl: ", $element[0].getAttribute('blog-url'),
			"name: ", $element[0].getAttribute('name'),
			"social: ", $element[0].getAttribute('social'),
			"dateFormat: ", $element[0].getAttribute('dateFormat'),
			"showTitle: ", $element[0].getAttribute('showTitle')
		);*/
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
