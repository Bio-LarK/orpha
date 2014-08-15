'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisordersCtrl
 * @description
 * # DisordersCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisordersCtrl', function ($scope, $timeout, $stateParams, Disorder) {

        $scope.loadMore = loadMore;
        $scope.page = 0;
        activate();

        //////////////

        function activate() {
            $scope.disorders = Disorder.query({
                fields: 'nid,disorder_name',
                page: $scope.page++
            });
        }

        function loadMore() {
            var disorders = Disorder.query({
                fields: 'nid,disorder_name',
                page: $scope.page++
            }, function (disorders) {
                $scope.disorders = $scope.disorders.concat(disorders);
            });
        }
    });