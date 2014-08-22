'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GeneCtrl
 * @description
 * # GeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GeneCtrl', function ($scope, $stateParams, Gene, Disorder) {
        activate();

        ///////////
        function activate() {
            $scope.gene = Gene.get({
                nid: $stateParams.geneId //136402
            }, function (gene) {
                // disorder.getGenes();
                // disorder.getSigns();
            });

            // load the disorders
            Disorder.getFromGene($stateParams.geneId).then(function (disorders) {
                $scope.disorders = disorders;
            });

        }
    });