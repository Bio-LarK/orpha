'use strict';

/**
 * @ngdoc service
 * @name orphaApp.gene
 * @description
 * # gene
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Gene', function ($resource, ENV) {
        var Gene = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'gene',
            nid: '@nid'
        });
        return Gene;
    });