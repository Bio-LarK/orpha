'use strict';

/**
 * @ngdoc service
 * @name orphaApp.sign
 * @description
 * # sign
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Sign', function ($resource, Gene, RelationshipService) {
        var Sign = $resource('http://130.56.248.140/orphanet/api/entity_node/:nid', {
            'parameters[type]': 'clinical_sign',
            nid: '@nid'
        });

        angular.extend(Sign.prototype, {
            // getGenes: function () {
            //     // Get the gene ids
            //     this.genes = RelationshipService.getRelated(this['disorder_disgene'], 'disgene_gene', Gene);
            // }
        });


        return Sign;
    });