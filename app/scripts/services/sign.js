'use strict';

/**
 * @ngdoc service
 * @name orphaApp.sign
 * @description
 * # sign
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Sign', function ($resource, ENV, Gene, RelationshipService) {
        var Sign = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'sign',
            nid: '@nid'
        });

        angular.extend(Sign.prototype, {});

        return Sign;
    });