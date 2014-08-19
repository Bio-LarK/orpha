'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignCtrl
 * @description
 * # SignCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignCtrl', function ($scope, $stateParams, Disorder) {

        activate();

        ////////////
        function activate() {
            // load the disorders
            Disorder.getFromSign($stateParams.signId).then(function (disorders) {
                $scope.disorders = disorders;
            });
        }
    });