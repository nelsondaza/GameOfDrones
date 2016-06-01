'use strict';
angular.module('godapp.controllers.game', ['godapp.factories'])
	.controller('GameController', ['$scope', '$location', 'Players', 'Moves', '$mdDialog', '$element', function( $scope, $location, Players, Moves, $mdDialog, $element ) {

		var self = this;
		self.end = false;

		self.init = function( ) {
			self.player1 = null;
			self.score1 = 0;
			self.player2 = null;
			self.score2 = 0;
			self.actualPlayer = null;
			self.actualMove = null;
			self.ready = false;

			self.ranking = [];
			Players.get(function( resource ){
				self.ranking = resource.data;
				self.players =  self.ranking.map( function (item) {
					item.value = item.name.toLowerCase();
					return item;
				});

			});

			self.moves = {};
			Moves.get(function( resource ){
				angular.forEach(resource.data,function(value){
					self.moves[value.name] = value;
				});
			});

		};

		self.init();

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

		self.start = function ( ev ) {
			if( self.player1.id == self.player2.id ) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent($element)
						.clickOutsideToClose(true)
						.title('Player selection error')
						.textContent('It seems like you are trying to play against yourself.')
						.ariaLabel('Player selection error')
						.ok('Got it!')
						.targetEvent(ev)
				);
			}
			else {
				self.ready = true;
				self.actualPlayer = self.player1;
			}

		};

		self.doMove = function( move ) {

			if( self.actualMove ) {
				if( move.kills == self.actualMove.name ) {
					self.score1 += ( self.actualPlayer.id == self.player1.id ? 1 : 0 );
					self.score2 += ( self.actualPlayer.id == self.player2.id ? 1 : 0 );

					$mdDialog.show(
						$mdDialog.alert()
							.parent($element)
							.clickOutsideToClose(true)
							.title('Point for you')
							.textContent('You got this point')
							.ariaLabel('Point for you')
							.ok('Got it!')
					);

				}
				else if( move.name == self.actualMove.kills ) {
					self.score2 += ( self.actualPlayer.id == self.player1.id ? 1 : 0 );
					self.score1 += ( self.actualPlayer.id == self.player2.id ? 1 : 0 );

					$mdDialog.show(
						$mdDialog.alert()
							.parent($element)
							.clickOutsideToClose(true)
							.title('Point missed')
							.textContent('You lost this point')
							.ariaLabel('Point missed')
							.ok('Got it!')
					);
				}
				else {
					$mdDialog.show(
						$mdDialog.alert()
							.parent($element)
							.clickOutsideToClose(true)
							.title('Draw')
							.textContent('Not point this time')
							.ariaLabel('Draw')
							.ok('Got it!')
					);
				}
				self.actualMove = null;
			}
			else {
				self.actualMove = move;
			}

			if( self.score1 == 3 || self.score2 == 3 ) {
				var winner = ( self.score2 == 3 ? self.player2 : self.player1 );
				var loser = ( self.score2 == 3 ? self.player1 : self.player2 );

				winner.won ++;
				loser.lost ++;

				$mdDialog.show(
					$mdDialog.alert()
						.parent($element)
						.clickOutsideToClose(true)
						.title('Winner')
						.textContent('The winner of this game was: ' + winner.name)
						.ariaLabel('Winner')
						.ok('Got it!')
				);
				self.init();

			}
			else {
				self.actualPlayer = ( self.actualPlayer.id == self.player1.id ? self.player2 : self.player1 );
			}
		};

	}]);
