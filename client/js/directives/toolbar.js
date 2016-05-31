'use strict';
angular.module('godapp.directives.toolbar', [])
	.directive('toolbar', ['$rootScope', '$location', '$http', function( $rootScope, $location, $http ) {
		return {
			templateUrl: '/tpl/toolbar.html',
			controller: ['$location',function ($location) {
				this.home  = function () {
					console.debug( 'home' );
					$location.path('/');
				};
				this.play  = function () {
					console.debug( 'play' );
					$location.path('/play');
				};
				this.ranking  = function () {
					console.debug( 'rank' );
					$location.path('/ranking');
				};
				this.admin = function () {
					console.debug( 'admin' );
					$location.path('/admin');
				};
			}],
			controllerAs: 'toolbar'
		}
	}]);