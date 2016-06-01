'use strict';

angular.module('godapp.factories.games', [])
	.factory('Games', ['$resource', function ($resource) {
		return $resource('/games/:id', null, {
			'update': {method: 'PUT'}
		})
	}]);
