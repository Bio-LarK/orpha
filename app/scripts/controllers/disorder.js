'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisorderCtrl
 * @description
 * # DisorderCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisorderCtrl', function ($scope, $stateParams, Disorder, Page, promiseTracker) {
        $scope.disorderTracker = promiseTracker();
        $scope.signsTracker = promiseTracker();
        $scope.genesTracker = promiseTracker();
        $scope.toggleParents = toggleParents;
        activate();
        ////////////

        function activate() {
            var disorder = Disorder.get({
                nid: $stateParams.disorderId //136402
            }, function (disorder) {
                $scope.disorder = disorder;
                var genesPromise = disorder.getGenes();
                $scope.genesTracker.addPromise(genesPromise);
                var signsPromise = disorder.getSigns();
                $scope.signsTracker.addPromise(signsPromise);
                Page.setTitle(disorder['disorder_name']);
            });
            $scope.disorderTracker.addPromise(disorder.$promise);
            $scope.signsTracker.addPromise(disorder.$promise);
            $scope.genesTracker.addPromise(disorder.$promise);
        }

        function toggleParents(disorder) {
            disorder.isShowingParents = !disorder.isShowingParents;
            disorder.getParents().then(function (disorders) {
                console.log('parents', disorders);
            });
        }

    });