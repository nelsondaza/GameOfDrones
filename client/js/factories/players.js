'use strict';

angular.module('godapp.factories.players', [])
	.factory('Players', ['$resource', function ($resource) {
		return $resource('/players/:id', null, {
			'update': {method: 'PUT'}
		})
	}]);
