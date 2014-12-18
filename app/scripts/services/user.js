'use strict';

/**
 * @ngdoc service
 * @name orphaApp.user
 * @description
 * # user
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('User', function($resource, ENV) {
        var User = $resource(ENV.apiEndpoint + '/entity_user/:uid', {
            uid: '@uid'
        });
        return User;
    });
