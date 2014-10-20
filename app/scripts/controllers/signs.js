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
            Page.setTitle('All Clinical Signs');
            
            getSigns($scope.page++).then(function(signs) {
                $scope.signs = signs;
            });
        }

        function loadMore() {
            getSigns($scope.page++).then(function(signs) {
                $scope.signs = $scope.signs.concat(signs);
            });
        }

        function getSigns(page) {
            var signs = Sign.query({
                fields: 'nid,sign_name,sign_dissign,title',
                page: page
            });
            var signsPromise = signs.$promise;
            signsPromise.then(function(signs) {
                _.each(signs, function(sign) {
                    sign.loadDisorders(true);
                });
            });
            $scope.loadingTracker.addPromise(signsPromise);
            return signsPromise;
        }


    });