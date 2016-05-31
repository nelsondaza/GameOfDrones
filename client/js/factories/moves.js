'use strict';

// Service "socket" as connection to Node services
angular.module('godapp.factories.moves', [])
	.factory('Moves', ['$resource', function ($resource) {
		return $resource('/moves/:id', null, {
			'update': {method: 'PUT'}
		})
	}]);
