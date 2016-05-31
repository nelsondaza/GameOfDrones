'use strict';
angular.module('godapp.directives.ranking-list', ['godapp.factories.players'])
	.directive('rankingList', ['$rootScope', '$location', '$http', function( $rootScope, $location, $http ) {
		return {
			templateUrl: '/tpl/ranking-list.html',
			controller: ['$location', 'Players',function ($location, Players) {
				console.debug('load..');
				var self = this;
				this.ranking = [];
				Players.get(function( resource ){
					self.ranking = resource.data;
				});
			}],
			controllerAs: 'ranking'
		}
	}]);