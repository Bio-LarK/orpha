'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ModalsRemovedisorderfromclassificationCtrl
 * @description
 * # ModalsRemovedisorderfromclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ModalsRemoveDisorderFromClassificationCtrl', function($scope, TransactionRequest, 
        config, $modalInstance) {
        var vm = this;
        vm.disorder = config.disorder;
        vm.parent = config.parent;
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            var transactionRequest = TransactionRequest.create();
            transactionRequest
                .addRemoveTransaction(
                    vm.disorder.nid, 
                    'disorder_parent', 
                    vm.parent.nid
                )
                .setTitle('Remove ' + vm.disorder.title + ' from ' + vm.parent.title)
                .setReason(vm.reason)
                .save();

            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    });
