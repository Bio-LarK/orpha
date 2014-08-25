'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SignsCtrl
 * @description
 * # SignsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SignsCtrl', function ($scope, Sign) {
        activate();

        /////////////

        function activate() {
            $scope.signs = Sign.query({
                fields: 'nid,sign_name,sign_dissign'
            });
        }
    });