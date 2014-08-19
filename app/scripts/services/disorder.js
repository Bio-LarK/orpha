'use strict';

/**
 * @ngdoc service
 * @name orphaApp.disorder
 * @description
 * # disorder
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Disorder', function ($resource, $http, $q, RelationshipService) {
        var Disorder = $resource('http://130.56.248.140/orphanet/api/entity_node/:nid', {
            'parameters[type]': 'disorder',
            nid: '@nid'
        });

        angular.extend(Disorder.prototype, {
            getGenes: function () {
                // Get the gene ids
                var fields = ['disgene_as', 'disgene_at', 'disgene_gene'];
                return RelationshipService.getRelated(this, 'disorder_disgene', fields);
            },
            getSigns: function () {
                // Get the gene ids
                var fields = ['ds_sign', 'ds_frequency'];
                return RelationshipService.getRelated(this, 'disorder_phenotype', fields);
            }
        });

        Disorder.getFromSign = function (signId) {
            return $http.get('http://130.56.248.140/orphanet/api/entity_node/' +
                signId + '/nodes_field_ds_sign?fields=ds_disorder').then(function (response) {
                var disorders = _.map(response.data, function (dsSign) {
                    return new Disorder(dsSign['ds_disorder']);
                });
                return disorders;
            });
        };

        return Disorder;
    });

/*
    http://130.56.248.140/orphanet/api/entity_node?parameters[nid][0]=115025&pa…&parameters[nid][8]=115274&parameters[nid][9]=115260&parameters[type]=sign
     */