'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GeneCtrl
 * @description
 * # GeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GeneCtrl', function ($scope, $stateParams, Gene, Disorder, promiseTracker, Page, ENV, $http, $q) {
        $scope.disordersTracker = promiseTracker();
        $scope.geneTracker = promiseTracker();

        activate();


        ///

        function activate() {
            getGene($stateParams.geneId).then(setGene);
            // $scope.geneTracker.addPromise($scope.gene.$promise);
            // $scope.disordersTracker.addPromise($scope.gene.$promise);
            // $scope.gene.$promise.then(function(gene) {
            //     Page.setTitle(gene.title);
            // });


            // load the disorders
            // var disordersPromise = Disorder.getFromGene($stateParams.geneId).then(function (disorders) {
            //     $scope.disorders = disorders;
            //     $scope.gene.classifications = _.flatten(_.pluck($scope.disorders, 'disorder_class'));
            // });
            // $scope.disordersTracker.addPromise(disordersPromise);eParams.geneId).then(setGene);

        }

        ///////////
        function getGene(geneId) {
            return Gene.get({
                nid: geneId //136402
            }).$promise;
        }

        function setGene(gene) {
            $scope.gene = gene;
            Page.setTitle(gene.gene_name);
            gene.loadDisorders();

            // load locuses
            var locusNids = _.pluck(gene.gene_genelocus, 'nid');
            loadSelected(locusNids).then(function(locuses) {
                 gene.gene_genelocus = locuses;
            });

            var erNids = _.pluck(gene.gene_er, 'nid');
            loadSelected(erNids).then(function(externalReferences) {
                gene.gene_er = externalReferences;
            });
        }

        function loadSelected(nids) {
            var promises = _.map(nids, function (nid) {
                return load(nid);
            });
            return $q.all(promises);
        }

        function load(nid) {
            return $http.get(ENV.apiEndpoint + '/entity_node/' + nid).then(function(response) {
                return response.data;
            });
        }




    });