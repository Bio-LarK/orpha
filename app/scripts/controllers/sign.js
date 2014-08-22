'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignCtrl
 * @description
 * # SignCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignCtrl', function ($scope, $stateParams, Disorder, Sign) {

        activate();

        ////////////
        function activate() {
            $scope.sign = Sign.get({
                nid: $stateParams.signId
            });

            // load the disorders
            Disorder.getFromSign($stateParams.signId).then(function (disorders) {
                $scope.disorders = disorders;
            });
        }
    });