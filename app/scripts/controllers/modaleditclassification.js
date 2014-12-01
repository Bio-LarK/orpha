'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ModaleditclassificationCtrl
 * @description
 * # ModaleditclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ModalEditClassificationCtrl', function($scope, config, TransactionRequest,
        transactionStatusService, $modalInstance, ListTransaction, toaster, $q) {
        var vm = this;
        vm.classification = config.classification;
        vm.disorder = config.disorder;
        vm.parent = config.parent;
        vm.newParent = config.newParent;
        vm.proposeChanges = save;
        vm.cancel = cancel;

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function save() {
            var transactionRequest = TransactionRequest.create();
            transactionRequest
                .addChangeTransaction(
                    vm.disorder.nid,
                    'disorder_parent',
                    vm.parent.nid,
                    vm.newParent.nid
                )
                .setTitle('Change the parent of ' + vm.disorder.title)
                .setReason(vm.reason)
                .save().then(function() {
                    toaster.pop('success', 'Suggestion submitted.');
                });
            
            $modalInstance.close();
        }
    });
