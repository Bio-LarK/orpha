'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GeneCtrl
 * @description
 * # GeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GeneCtrl', function ($scope, $stateParams, Gene, Disorder, promiseTracker) {
        $scope.disordersTracker = promiseTracker();
        $scope.geneTracker = promiseTracker();
        activate();

        ///////////
        function activate() {
            $scope.gene = Gene.get({
                nid: $stateParams.geneId //136402
            });
            $scope.geneTracker.addPromise($scope.gene.$promise);
            $scope.disordersTracker.addPromise($scope.gene.$promise);

            // load the disorders
            var disordersPromise = Disorder.getFromGene($stateParams.geneId).then(function (disorders) {
                $scope.disorders = disorders;
            });
            $scope.disordersTracker.addPromise(disordersPromise);

        }
    });