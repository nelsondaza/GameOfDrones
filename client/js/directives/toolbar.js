'use strict';
angular.module('godapp.directives.toolbar', [])
	.directive('toolbar', ['$rootScope', '$location', '$http', function( $rootScope, $location, $http ) {
		return {
			templateUrl: '/tpl/toolbar.html',
			controller: ['$location',function ($location) {
				this.play  = function () {
					$location.path('/');
				};
				this.admin = function () {
					$location.path('/admin');
				};
			}],
			controllerAs: 'toolbar'
		}
	}]);