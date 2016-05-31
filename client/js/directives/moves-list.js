'use strict';
angular.module('godapp.directives.moves-list', ['godapp.factories.moves'])
	.directive('movesList', ['$rootScope', '$location', '$http', function( $rootScope, $location, $http ) {
		return {
			templateUrl: '/tpl/moves-list.html',
			controller: ['$location', 'Moves',function ($location, Moves) {
				var self = this;
				this.moves = [];
				Moves.get(function( resource ){
					self.moves = resource.data;
				});
			}],
			controllerAs: 'moves'
		}
	}]);