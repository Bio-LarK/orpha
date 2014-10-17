'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignsCtrl
 * @description
 * # SignsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignsCtrl', function ($scope, Sign, promiseTracker, Page) {
        $scope.loadMore = loadMore;
        $scope.loadingTracker = promiseTracker();
        $scope.page = 0;
        activate();

        /////////////

        function activate() {
            var promise = Sign.query({
                fields: 'nid,sign_name,sign_dissign'
            }).$promise;
            promise.then(function(signs) {
                $scope.signs = signs;
                _.each(signs, function(sign) {
                    sign.loadDisorders(true);
                });
            });
            $scope.loadingTracker.addPromise(promise);
            Page.setTitle('All Clinical Signs');
        }

        function loadMore() {
            var signs = Sign.query({
                fields: 'nid,sign_name,sign_dissign,title',
                page: ++$scope.page
            }, function (signs) {
                $scope.signs = $scope.signs.concat(signs);
                _.each(signs, function(sign) {
                    sign.loadDisorders(true);
                });
            });
            $scope.loadingTracker.addPromise(signs.$promise);
        }

    });