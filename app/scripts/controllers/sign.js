'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignCtrl
 * @description
 * # SignCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignCtrl', function ($scope, $stateParams, Disorder, Sign, promiseTracker) {
        $scope.signTracker = promiseTracker();
        $scope.disordersTracker = promiseTracker();
        activate();

        ////////////
        function activate() {
            $scope.sign = Sign.get({
                nid: $stateParams.signId
            });
            $scope.signTracker.addPromise($scope.sign);

            // load the disorders
            var disorderPromise = Disorder.getFromSign($stateParams.signId).then(function (disorders) {
                $scope.disorders = disorders;
            });
            $scope.disordersTracker.addPromise($scope.sign);
            $scope.disordersTracker.addPromise(disorderPromise);
        }
    });