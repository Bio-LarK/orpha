'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisordersCtrl
 * @description
 * # DisordersCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisordersCtrl', function ($scope, $timeout, $stateParams, promiseTracker, Disorder) {
        $scope.loadMore = loadMore;
        $scope.loadingTracker = promiseTracker();
        $scope.page = 0;
        activate();

        //////////////

        function activate() {
            $scope.disorders = Disorder.query({
                fields: 'nid,disorder_name',
                page: $scope.page++
            });
            $scope.loadingTracker.addPromise($scope.disorders.$promise);
        }


        function loadMore() {
            var disorders = Disorder.query({
                fields: 'nid,disorder_name',
                page: $scope.page++
            }, function (disorders) {
                $scope.disorders = $scope.disorders.concat(disorders);
            });
            $scope.loadingTracker.addPromise(disorders.$promise);
        }
    });