'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ModalsAdddisordertoclassificationCtrl
 * @description
 * # ModalsAdddisordertoclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ModalsAddDisorderToClassificationCtrl', function(TransactionRequest, toaster, config, Disorder, $modalInstance,
        searchService) {
        var vm = this;
        vm.config = config;
        vm.disorder = config.disorder;
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
        function closeWithAddedDisorder(newDisorder) {
            var transactionRequest = TransactionRequest.create();
            console.log('disorder', vm.disorder.nid, newDisorder.nid);
            transactionRequest
                .addAddTransaction(
                    vm.disorder.nid,
                    'disorder_parent',
                    newDisorder.nid
                )
                .setTitle('Add ' +  newDisorder.title + ' to ' + vm.disorder.title)
                .setReason(vm.reason)
                .save();
            
            $modalInstance.close(newDisorder);
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    });
