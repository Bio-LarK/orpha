'use strict';

/**
 * @ngdoc service
 * @name orphaApp.disorder
 * @description
 * # disorder
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Disorder', function($resource, $http, $q, RelationshipService, ENV, $log,
        Classification) {
        var Disorder = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'disorder',
            nid: '@nid'
        }, {
            get: {
                method: 'GET',
                transformResponse: $http.defaults.transformResponse.concat([
                    transformGetResponse
                ])
            },
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: $http.defaults.transformResponse.concat([
                    transformQueryResponse
                ])
            },
        });
        Disorder.prototype.getGenes = getGenes;
        Disorder.prototype.getSigns = getSigns;
        Disorder.prototype.getParents = getParents;
        Disorder.prototype.loadChildren = loadChildren;

        Disorder.getFromSign = getFromSign;
        Disorder.getFromGene = getFromGene;
        Disorder.getParentsFromDisorderInClassification = getParentsFromDisorderInClassification;
        Disorder.getRoots = getRoots;
        Disorder.getRootForClassification = getRootForClassification;
        return Disorder;

        ///////////////////

        function transformQueryResponse(transactionRequests, headersGetter) {
            _.each(transactionRequests, function(transactionRequest) {
                transformGetResponse(transactionRequest);
            });
            return transactionRequests;
        }

        function transformGetResponse(disorder, headersGetter) {
            // Convert parents to Disorder objects
            disorder['disorder_parent'] = _.sortBy(disorder['disorder_parent'], 'nid');
            disorder['disorder_parent'] = _.map(disorder.disorder_parent, function(parent) {
                return new Disorder(parent);
            });
            disorder['disorder_child'] = _.sortBy(disorder['disorder_child'], 'nid');
            disorder['disorder_child'] = _.map(disorder.disorder_child, function(child) {
                $log.debug('wrapping children');
                return new Disorder(child);
            });
            disorder['disorder_class'] = _.map(disorder.disorder_class, function(classification) {
                return new Classification(classification);
            });
            disorder.isOpenable = true;
            disorder.body = '<p>The incorporation of Orphanet summaries for diseases is ' +
            'currently under development. The summary below is for illustrative purposes.</p> ' +
            '<p>This disorder is a rare neurodegenerative disorder of the astrocytes comprised ' +
             'of two clinical forms: AxD Type I and Type II (see these terms) manifesting with' +
              'various degrees of macrocephaly, spasticity, ataxia and seizures and leading to ' +
              'psychomotor regression and death.</p><p>The prevalence is unknown. One population ' +
               'based study in Japan estimated an annual incidence of 1/ 2.7 million.</p><p>The ' +
               'clinical presentation depends on the subtype. Previously, AxD was classified ' +
               'either as infantile, juvenile or adult, based simply on age of onset. The currently ' +
               'used classification system is based on a constellation of clinical and radiologic ' +
               'features and includes AxD type I and AxD type II (see these terms). AxD type I is ' +
               'more likely to be of early onset (mean 1.74 years) and shorter survival (median 14 ' +
                'years) whereas type II exhibits onset throughout the lifespan (mean 21.64 years, ' +
                'but can occur in early childhood) and has longer survival (median 25 years).</p>';
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

        function getParentsFromDisorderInClassification(disorder, classification) {
            // Get all the parent ids
            var ids = _.map(disorder['disorder_parent'], function(parent) {
                return parent.id || parent.nid;
            });

            $log.debug('GETTING PARENTS', ids);
            if (!ids.length) {
                return $q.when(null);
            }
            var request = _.indexBy(ids, function(ids, index) {
                return 'parameters[nid][' + index + ']';
            });
            if(classification) {
                request['parameters[disorder_class]'] = classification.nid;
            }
            request.fields = ['nid', 'disorder_name', 'title', 'disorder_parent', 'disorder_class'].join(',');
            return Disorder.query(request).$promise;
        }


        function getParents(classification) {

            /* jshint validthis: true */
            var disorder = this;

            return Disorder.getParentsFromDisorderInClassification(disorder, classification).then(function(parents) {
                // Load the children for the parents
                var promises = _.map(parents, function(parent) {
                    $log.debug('loading children for parents', parent.title);
                    return parent.loadChildren().then(function(children) {
                        $log.debug('loaded children for parent', parent.title, children);
                        var index = _.findIndex(parent['disorder_child'], function(child) {
                            $log.debug('finding match', child, child.nid, disorder.nid);
                            return child.nid === disorder.nid;
                        });
                        $log.debug('index of child in parent',index);
                        parent['disorder_child'].splice(index, 1);
                        parent['disorder_child'].unshift(disorder);
                        return parent;
                    }, function() {
                        return parent;
                    });
                    // parent.hasLoadedChildren = true;
                    // parent.disorder_child = [disorder];
                    // return parent;
                });
                $log.debug('returning promises');
                return $q.all(promises);
            }, function() {
                $log.debug('no parents found');
                return [];
            });
        }


        function loadChildren() {
            $log.debug('loading children now...');
            /* jshint validthis: true */
            var disorder = this;
            if(disorder.hasLoadedChildren) {
                return $q.when(disorder['disorder_child']);
            }
            return Disorder.query({
                fields: 'nid,title,disorder_name,disorder_child,disorder_class',
                'parameters[disorder_parent]': disorder.nid
            }).$promise.then(function(children) {
                $log.debug('children loaded');
                disorder.hasLoadedChildren = true;
                disorder['disorder_child'] = _.sortBy(children, 'nid');

                var isOpenable = false;
                _.each(children, function(child) {
                    isOpenable = isOpenable || child['disorder_child'].length;
                    _.each(child['disorder_child'], function(grandChild) {
                        grandChild.isOpenable = true;
                    });
                });
                disorder.isOpenable = isOpenable;
                return children;
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

        function getRoots() {
            var fields = 'nid,title,disorder_name,disorder_class';
            var page1 = Disorder.query({
                'parameters[disorder_root]': 1,
                'fields': fields,
                'page': 0
            }).$promise;

            var page2 = Disorder.query({
                'parameters[disorder_root]': 1,
                'fields': fields,
                'page': 1
            }).$promise;

            return $q.all([page1, page2]).then(function(disorders) {
                return _.flatten(disorders);
            });
        }

        function getRootForClassification(classification) {
            return Disorder.query({
                'parameters[disorder_root]': 1,
                'parameters[disorder_class]': classification.nid,
            }).$promise.then(function(disorders) {
                if(!disorders.length) {
                    return null;
                } 
                return disorders[0];
            });
        }

    });

/*
    http://130.56.248.140/orphanet/api/entity_node?parameters[nid][0]=115025&pa…&parameters[nid][8]=115274&parameters[nid][9]=115260&parameters[type]=sign
     */
