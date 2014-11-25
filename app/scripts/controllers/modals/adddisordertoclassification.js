'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ModalsAdddisordertoclassificationCtrl
 * @description
 * # ModalsAdddisordertoclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ModalsAddDisorderToClassificationCtrl', function($scope, config, Disorder, $modalInstance,
        searchService) {
        var vm = this;
        vm.config = config;
        vm.refreshDisorders = refreshDisorders;
        vm.save = save;
        vm.cancel = cancel;

        ///////

        function refreshDisorders(disorderName) {
            searchService.search(disorderName).then(setDropdownDisorders);
        }
        function setDropdownDisorders(disorders) {
            vm.disorders = _.filter(disorders, {type: 'Disorder'});
        }
        function save(result) {
            // get the disorder
            return Disorder.get({
                nid: result.node
            }).$promise.then(closeWithAddedDisorder);
        }
        function closeWithAddedDisorder(disorder) {
            $modalInstance.close(disorder);
        }
        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    });
