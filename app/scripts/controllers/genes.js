'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GenesCtrl
 * @description
 * # GenesCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GenesCtrl', function ($scope, Gene, promiseTracker, Page) {
        $scope.loadMore = loadMore;
        $scope.loadingTracker = promiseTracker();
        $scope.page = 0;

        activate();

        /////////////

        function activate() {
            Page.setTitle('Genes');
            $scope.genes = Gene.query({
                fields: 'nid,gene_name,gene_symbol,gene_disgene',
                page: $scope.page++
            });
            $scope.loadingTracker.addPromise($scope.genes.$promise);
        }

        function loadMore() {
            var genes = Gene.query({
                fields: 'nid,gene_name,gene_symbol,gene_disgene',
                page: $scope.page++
            }, function (genes) {
                $scope.genes = $scope.genes.concat(genes);
            });
            $scope.loadingTracker.addPromise(genes.$promise);
        }

    });