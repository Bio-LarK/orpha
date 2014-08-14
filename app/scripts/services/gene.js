'use strict';

/**
 * @ngdoc service
 * @name orphaApp.gene
 * @description
 * # gene
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Gene', function ($resource) {
        var Gene = $resource('http://130.56.248.140/orphanet/api/entity_node/:nid', {
            'parameters[type]': 'gene',
            nid: '@nid'
        });

        angular.extend(Gene.prototype, {

        });


        return Gene;
    });