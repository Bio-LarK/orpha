'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignsCtrl
 * @description
 * # SignsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignsCtrl', function ($scope, Sign, promiseTracker) {
        $scope.loadMore = loadMore;
        $scope.loadingTracker = promiseTracker();
        $scope.page = 0;
        activate();

        /////////////

        function activate() {
            $scope.signs = Sign.query({
                fields: 'nid,sign_name,sign_dissign'
            });
            $scope.loadingTracker.addPromise($scope.signs.$promise);
        }

        function loadMore() {
            var signs = Sign.query({
                fields: 'nid,Sign_name',
                page: $scope.page++
            }, function (signs) {
                $scope.signs = $scope.signs.concat(signs);
            });
            $scope.loadingTracker.addPromise(signs.$promise);
        }

    });