(function() {
	'use strict';

	angular.module('godapp.services', [

	]);
	angular.module('godapp.factories', [
		'godapp.factories.moves',
		'godapp.factories.players'
	]);
	angular.module('godapp.controllers', [

	]);
	angular.module('godapp.directives', [
		'godapp.directives.toolbar',
		'godapp.directives.moves-list',
		'godapp.directives.ranking-list'
	]);

	var app = angular.module('godapp',['ngResource','ngAnimate','ngMaterial', 'ui.router', 'godapp.controllers', 'godapp.services', 'godapp.factories', 'godapp.directives']);

	app.config(['$provide', '$urlRouterProvider', '$stateProvider', '$httpProvider',function($provide, $urlRouterProvider, $stateProvider, $httpProvider) {

		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/tpl/home.html'
			})
			.state('play', {
				url: '/play',
				templateUrl: '/tpl/play.html'
			})
			.state('ranking', {
				url: '/ranking',
				templateUrl: '/tpl/ranking.html'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/tpl/admin.html'
			})
		;

	}]);

	app.run(['$rootScope','$location', function ( $rootScope, $location ) {


	}]);


})();