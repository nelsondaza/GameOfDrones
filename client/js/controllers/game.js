'use strict';
angular.module('godapp.controllers.game', ['godapp.factories'])
	.controller('GameController', ['$scope', '$location', 'Players', 'Moves', 'Games', '$mdDialog', '$element', function( $scope, $location, Players, Moves, Games, $mdDialog, $element ) {

		var self = this;

		self.init = function( ) {
			self.player1 = null;
			self.score1 = 0;
			self.player2 = null;
			self.score2 = 0;
			self.actualPlayer = null;
			self.actualMove = null;
			self.ready = false;
			self.end = false;

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

			var dTitle = '';
			var dContent = '';
			var dCallback = null;

			if( self.actualMove ) {
				if( move.kills == self.actualMove.name ) {
					self.score1 += ( self.actualPlayer.id == self.player1.id ? 1 : 0 );
					self.score2 += ( self.actualPlayer.id == self.player2.id ? 1 : 0 );

					dTitle = 'Point for you';
					dContent = 'You got this point';
				}
				else if( move.name == self.actualMove.kills ) {
					self.score2 += ( self.actualPlayer.id == self.player1.id ? 1 : 0 );
					self.score1 += ( self.actualPlayer.id == self.player2.id ? 1 : 0 );

					dTitle = 'Point missed';
					dContent = 'You lost this point';
				}
				else {
					dTitle = 'Draw';
					dContent = 'Not point this time';
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

				dTitle = 'Winner!!';
				dContent = 'The winner of this game was: ' + winner.name;

				Games.save({
					winner_id:winner.id,
					loser_id:loser.id
				});

				self.end = true;
			}
			else {
				self.actualPlayer = ( self.actualPlayer.id == self.player1.id ? self.player2 : self.player1 );
			}

			if( dTitle ) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent($element.parent())
						.clickOutsideToClose(true)
						.title(dTitle)
						.textContent(dContent)
						.ariaLabel(dTitle)
						.ok('Got it!')
				);

			}
		};

	}]);
