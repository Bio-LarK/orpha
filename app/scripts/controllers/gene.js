'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GeneCtrl
 * @description
 * # GeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GeneCtrl', function ($scope, $stateParams, Gene) {
        var vm = $scope;
        activate();

        ///////////
        function activate() {
            vm.gene = Gene.get({
                nid: $stateParams.geneId //136402
            }, function (gene) {
                // disorder.getGenes();
                // disorder.getSigns();
            });
        }
    });