'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisorderCtrl
 * @description
 * # DisorderCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisorderCtrl', function ($scope, $stateParams, Disorder, Page) {
        activate();

        $scope.toggleParents = toggleParents;

        ////////////

        function activate() {
            $scope.disorder = Disorder.get({
                nid: $stateParams.disorderId //136402
            }, function (disorder) {
                disorder.getGenes();
                disorder.getSigns();
                Page.setTitle(disorder['disorder_name']);
            });
        }

        function toggleParents(disorder) {
            disorder.isShowingParents = !disorder.isShowingParents;
            disorder.getParents().then(function (disorders) {
                console.log('parents', disorders);
            });
        }

    });