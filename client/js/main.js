(function() {
	'use strict';

	angular.module('godapp.services', [
		//'godapp.services.socket'
	]);
	angular.module('godapp.factories', [
		'godapp.factories.moves'
	]);
	angular.module('godapp.controllers', [
		//'godapp.controllers.godapp'
	]);
	angular.module('godapp.directives', [
		'godapp.directives.toolbar',
		'godapp.directives.moves-list'
	]);

	var app = angular.module('godapp',['ngResource','ngAnimate','ngMaterial', 'ui.router', 'godapp.controllers', 'godapp.services', 'godapp.directives']);

	app.config(['$provide', '$urlRouterProvider', '$stateProvider', '$httpProvider',function($provide, $urlRouterProvider, $stateProvider, $httpProvider) {

		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/tpl/home.html'
			});

	}]);

	app.run(['$rootScope','$location', function ( $rootScope, $location ) {


	}]);


})();