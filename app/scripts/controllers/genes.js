'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:GenesCtrl
 * @description
 * # GenesCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('GenesCtrl', function ($scope, Gene) {
        var vm = $scope;

        activate();

        /////////////

        function activate() {
            vm.genes = Gene.query({
                fields: 'nid,gene_name'
            });
        }
    });