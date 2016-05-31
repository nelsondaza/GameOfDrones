'use strict';

// Service "socket" as connection to Node services
angular.module('godapp.services.socket', [])
	.service('SocketService', ['$rootScope', '$location', '$http', function( $rootScope, $location, $http ) {
		var socket = null;
		var connected = false;
		var actions = 0;

		this.connect = function() {
			try {
				socket = {
					actions: {},
					on: function( key, callback ) {
						this.actions[key] = this.actions[key] || [];
						this.actions[key].push( callback );
					},
					do: function( ) {
						var key = arguments[0];
						var value = ( arguments.length > 1 ? arguments[1] : null );
						if( this.actions[key] ) {
							console.service( "Socket DO: " + key, value );
							for( var c = 0; c < this.actions[key].length; c++ )
								this.actions[key][c]( value );
						}
						else {
							console.service( "Socket ERROR DO: " + key, value );
						}
					},
					emit:function( key, params ) {
						actions ++;

						key = key.toLowerCase().replace( /([^a-z0-9]+)/gi, '_' );
						console.service( "Socket EMIT: " + key, params );
						params = params || {};
						params.service = key;

						$rootScope.$broadcast( 'SocketService:emit:action', actions );
						$http.get('services/index.php', {
							params: params
						}).success(function(response) {
							actions --;
							console.service( "Socket DONE: ", response );
							$rootScope.$broadcast( 'SocketService:emit:action', actions );
							if( response ) {
								if( response.action )
									socket.do( response.action, response.data );
								else if( response.error )
									$rootScope.$broadcast( 'SocketService:error', response.error );
							}
						});
					}
				};

				socket.on('Notes:list', function( response ) {
					console.service( "Notes:list", response );
					$rootScope.$broadcast( 'SocketService:notes:list', response );
				});

				socket.on('Notes:result', function( response ) {
					console.service( "Notes:result", response );
					$rootScope.$broadcast( 'SocketService:notes:result', response );
				});

				connected = true;
			}
			catch ( e ) {
				console.service( 'ERROR', e );
				socket = null;
				return false;
			}
			return true;
		};

		this.getNotes = function( ) {
			console.service( "SocketService:App:notes" );
			if( connected )
				socket.emit('notes:list' );
		};
		this.withdraw = function( value ) {
			console.service( "SocketService:withdraw", value );
			if( connected )
				socket.emit('withdraw', { 'value':value } );
		};
	}]);
