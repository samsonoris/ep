'use strict';
var blogs;

angular.module('blogger', [
	'blogger.directives',
	'blogger.controllers',
	'blogger.services'
]);

angular.module('blogger.directives',[]);
angular.module('blogger.directives')
	.directive('blogModule', function($compile){
		return {
			restrict: 'AEC',
			scope: true,
			link: function(scope,elem,attrs){
				scope.name = attrs.name
				scope.authors = attrs.authors
				scope.title = attrs.title
				scope.date = attrs.date
				scope.social = attrs.social
				scope.$apply();
			},
			template: '<blog-post ng-repeat="blog in blogs"></blog-post>'
		}
	})

	.directive('blogPost', function(){
		return {
			restrict: 'AEC',
			scope: true,
			template: '<div class="blog-header">' + 
						'<span class="author" ng-bind="blog.author"></span>' + 
						'<span class="date" ng-bind="blog.date"></span><div>' + 
						'<span class="title" ng-if="title" ng-bind="blog.title"></span>' + 
						'<div class="social-links" ng-if="social">Social Media Links</div>' +
						'<article class="blog-content" ng-bind="blog.blog"></article></div>'
		}
	});

angular.module('blogger.controllers',[]);
angular.module('blogger.controllers')
	.controller('BlogController', ['$scope','$element','BloggerService',function($scope,$element,BloggerService){
		$scope.blogs = BloggerService.loadBlogs($scope.name,$scope.url) || [];	
	}]);

angular.module('blogger.services',[]);
angular.module('blogger.services')
	.factory('BloggerService',function($http){
		return {
			createModule: function(attributes,type){
				var module = document.createElement('div');
				module.className = "blog-module"
				for (var i in attributes) {
					module.setAttribute(i,attributes[i]);
				}
				module.setAttribute('ng-controller','BlogController');
				return module;
			},
			createPost: function(module,blog){
				var scope = angular.element(module).scope();
				scope.blogs.push(blog);
				scope.$apply();
			},
			loadBlogs: function(name,url){
				url = url || '/blog/';
				$http.get(url + name).success(function(data){
					return data;
				}).error(function(data){

				});
			}			
		};
	});
