'use strict';
angular.module('godapp.controllers.game', ['godapp.factories'])
	.controller('GameController', ['$scope', '$location', 'Players', 'Moves', function( $scope, $location, Players, Moves ) {

		var self = this;

		$scope.player1 = null;
		$scope.player2 = null;
		$scope.ready = false;

		self.ranking = [];
		Players.get(function( resource ){
			self.ranking = resource.data;
			self.players =  self.ranking.map( function (item) {
				item.value = item.name.toLowerCase();
				return item;
			});
		});

		self.querySearch   = querySearch;
		self.selectedItemChange = selectedItemChange;
		self.searchTextChange   = searchTextChange;

		function querySearch (query) {
			return query ? self.players.filter( createFilterFor(query) ) : self.players;
		}
		function searchTextChange(text) {
			//
		}
		function selectedItemChange(item) {
			//
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(item) {
				return (item.name.indexOf(lowercaseQuery) != -1);
			};
		}

		/*

		$scope.withdraw = '';
		$scope.error = null;
		$scope.notes = null;
		$scope.wait = false;
		$scope.results = null;

		$scope.onkeyup = function(){
			var cleanValue = $scope.withdraw.replace(/([^\-0-9]+)/g, '');
			if( cleanValue != $scope.withdraw )
				$scope.withdraw = cleanValue;
		};

		$scope.withdrawNow = function( ) {
			$scope.error = null;
			$scope.results = null;
			SocketService.withdraw( $scope.withdraw );
		};


		$scope.$on('SocketService:pages:list', function(event, list) {
			console.controller('SocketService:pages:list', list );
			$scope.$apply(function(){
				$scope.pages = list;
				$scope.active = ( list.length > 0 );
			});
		});

		$scope.$on('SocketService:emit:action', function(event, actions) {
			$scope.wait = ( actions > 0 );
		});

		$scope.$on('SocketService:notes:list', function(event, list) {
			$scope.notes = list;
		});

		$scope.$on('SocketService:error', function(event, error) {
			$scope.error = error;
		});

		$scope.$on('SocketService:notes:result', function(event, results) {
			$scope.results = results;
		});*/

	}]);
