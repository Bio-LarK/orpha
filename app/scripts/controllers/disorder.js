'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisorderCtrl
 * @description
 * # DisorderCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisorderCtrl', function ($scope, Disorder, $stateParams) {
        var vm = $scope;
        activate();

        ////////////

        function activate() {
            vm.disorder = Disorder.get({
                nid: $stateParams.disorderId //136402
            }, function (disorder) {
                disorder.getGenes();
                disorder.getSigns();
            });
        }

    });