'use strict';

/**
 * @ngdoc service
 * @name orphaApp.disorder
 * @description
 * # disorder
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Disorder', function($resource, $http, $q, RelationshipService, ENV) {
        var Disorder = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'disorder',
            nid: '@nid'
        }, {
            get: {
                method: 'GET',
                transformResponse: $http.defaults.transformResponse.concat([
                    transformGetResponse
                ])
            }
        });
        Disorder.prototype.getGenes = getGenes;
        Disorder.prototype.getSigns = getSigns;
        Disorder.prototype.getParents = getParents;

        Disorder.getFromSign = getFromSign;
        Disorder.getFromGene = getFromGene;

        return Disorder;

        ///////////////////

        function transformGetResponse(disorder, headersGetter) {
            // Convert parents to Disorder objects
            disorder['disorder_parent'] = _.map(disorder.disorder_parent, function(parent) {
                return new Disorder(parent);
            });

            // Add in shorthand for inheritance
            _.each(disorder['disorder_inheritance'], function(disorderInheritance) {
                if (disorderInheritance['toi_name'] === 'Autosomal dominant') {
                    disorderInheritance.label = 'AD';
                } else if (disorderInheritance['toi_name'] === 'Autosomal recessive') {
                    disorderInheritance.label = 'AR';
                } else {
                    disorderInheritance.label = disorderInheritance['toi_name'];
                }
            });
            return disorder;
        }

        function getGenes() {
            /* jshint validthis: true */
            var disorder = this;
            // Get the gene ids
            var fields = ['disgene_as', 'disgene_at', 'disgene_gene'];
            return RelationshipService.getRelatedThroughIntermediary(disorder, 'disorder_disgene', fields);
        }

        function getSigns() {
            /* jshint validthis: true */
            var disorder = this;
            // Get the gene ids
            var fields = ['ds_sign', 'ds_frequency'];
            return RelationshipService.getRelatedThroughIntermediary(disorder, 'disorder_phenotype', fields);
        }

        function getParents() {
            /* jshint validthis: true */
            var disorder = this;

            // Get all the parent ids
            var ids = _.map(this['disorder_parent'], function(parent) {
                return parent.id || parent.nid;
            });
            if (!ids.length) {
                return $q.when(null);
            }

            // var ids = _.pluck(this['disorder_parent'], 'id');
            var request = _.indexBy(ids, function(ids, index) {
                return 'parameters[nid][' + index + ']';
            });
            request.fields = ['nid', 'disorder_name', 'disorder_parent'].join(',');

            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: request
            }).then(function(response) {
                disorder['disorder_parent'] = _.map(response.data, function(disorder) {
                    return new Disorder(disorder);
                });
                return disorder['disorder_parent'];
            });

        }

        function getFromSign(signId) {
            return $http.get(ENV.apiEndpoint + '/entity_node/' +
                signId + '/nodes_field_ds_sign?fields=ds_disorder').then(function(response) {
                var disorders = _.map(response.data, function(dsSign) {
                    return new Disorder(dsSign['ds_disorder']);
                });
                return disorders;
            });
        }

        function getFromGene(geneId) {
            return $http.get(ENV.apiEndpoint + '/entity_node/' +
                geneId + '/nodes_field_disgene_gene?fields=disgene_disorder').then(function(response) {
                var disorders = _.map(response.data, function(disgeneGene) {
                    return new Disorder(disgeneGene['disgene_disorder']);
                });
                return disorders;
            });
        }

    });

/*
    http://130.56.248.140/orphanet/api/entity_node?parameters[nid][0]=115025&pa…&parameters[nid][8]=115274&parameters[nid][9]=115260&parameters[type]=sign
     */
