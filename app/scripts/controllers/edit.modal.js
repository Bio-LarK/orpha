'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditModalCtrl
 * @description
 * # EditModalCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditModalCtrl', function($scope, $http, $modalInstance,
        ENV, ListTransaction, config, TransactionRequest, transactionStatusService,
        toaster, autocompleteService, EditAgeOfOnsetTransactionRequest) {

        var vm = this;
        vm.concept = config.concept;
        vm.propertyName = config.propertyName;
        vm.propertyContentType = config.propertyContentType;
        vm.propertyLabel = config.propertyLabel;
        vm.save = save;
        vm.cancel = cancel;
        vm.stuff = null;
        vm.prevalenceClasses = null;
        vm.prevalenceClass = null;
        vm.reason = '';


        vm.ageOfOnsets = {
            selectedOnsets: []
        };

        // FIXME: issue with preselecting items on ui-select
        // See github
        // https://github.com/angular-ui/ui-select/issues/404
        var currentSelectedOnsets = angular.copy(vm.concept.disorder_onset);
        vm.ageOfOnsetTypes = currentSelectedOnsets;
        vm.ageOfOnsets.selectedOnsets = currentSelectedOnsets;

        vm.refreshAgeOfOnsetTypes = function(term) {
            autocompleteService.autocomplete('age_of_onset', term).then(function(ageOfOnsetTypes) {
                vm.ageOfOnsetTypes = ageOfOnsetTypes;
            });
        };

        function save() {
            // create a new transaction
            //var transaction = new transaction();

            // setup what we changed
            // strip out whatever was there initally
            var addedOnsets = _.reject(vm.ageOfOnsets.selectedOnsets, function(selectedOnset) {
                return _.find(vm.concept.disorder_onset, {nid: selectedOnset.nid})
            });
            // strip out whatever is still selected
            var removedOnsets = _.reject(vm.concept.disorder_onset, function(originalOnset) {
                return _.find(vm.ageOfOnsets.selectedOnsets, {nid: originalOnset.nid})
            });
            //_.each(vm.ageOfOnsets.selectedOnsets)

            // save it
            var transactionRequest = EditAgeOfOnsetTransactionRequest.create(vm.concept, vm.reason);
            _.forEach(addedOnsets, function(addedOnset) {
                transactionRequest.addAddTransaction(vm.concept.nid, 'disorder_onset', addedOnset.nid);
            });
            _.forEach(removedOnsets, function(removedOnset) {
                transactionRequest.addRemoveTransaction(vm.concept.nid, 'disorder_onset', removedOnset.nid);
            });
            transactionRequest.save();
            $modalInstance.close();
        }

        function getRequest() {
            // FIXME: type switching code smell
            if (vm.type === EDIT_TYPE) {
                return proposeEditChanges();
            } else if (vm.type === REMOVE_TYPE) {
                return proposeRemoveChange();
            }
            throw new Error('Type missing');
        }

        function proposeRemoveChange() {
            var transactionRequest = TransactionRequestRemoveGene.create(vm.disorder, vm.gene, vm.reason);
            return transactionRequest;
        }

        function proposeEditChanges() {
            var transactionRequest = TransactionRequestEditGene.create(
                vm.disorder, vm.gene, vm.disorderGene, vm.reason
            );
            if(hasStatusChanged()) {
                transactionRequest.changeRelationshipStatus(vm.disorderGeneStatus);
            }
            if(hasRelationshipTypeChanged()) {
                transactionRequest.changeRelationshipType(vm.disorderGeneType);
            }
            return transactionRequest;
        }

        activate();

        ////

        function activate() {
            return getPropertyOptions();
        }

        function getPropertyOptions() {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': vm.propertyContentType,
                    fields: 'nid,title'
                }
            }).then(function(response) {
                vm.prevalenceClasses = response.data;
                vm.prevalenceClass = _.find(vm.prevalenceClasses, {nid: vm.concept[vm.propertyName].nid});
            });
        }

        //function save() {
        //    // Create a transaction
        //    var listTransaction = new ListTransaction({
        //        title: vm.concept.title,
        //        type: 'list_transaction',
        //        'ltrans_position': 0,
        //        'ltrans_onnode': vm.concept.nid,
        //        'ltrans_onprop': vm.propertyName,
        //        'ltrans_svalref': vm.prevalenceClass.nid,
        //        'ltrans_cvalref': vm.concept[vm.propertyName] && vm.concept[vm.propertyName].nid || null,
        //        body: {
        //            value: vm.reason,
        //            summary: vm.reason
        //        }
        //    });
        //    listTransaction.$save().then(function() {
        //        return transactionStatusService.loadStatusCodes().then(function() {
        //            // Add it to a transaction request
        //            var transactionRequest = new TransactionRequest({
        //                title: vm.concept.title + ' - ' + vm.propertyLabel,
        //                type: 'transaction_request',
        //                'tr_timestamp': new Date().getTime() / 1000,
        //                'tr_trans': [
        //                    listTransaction.nid
        //                ],
        //                'tr_status': transactionStatusService.submittedNid,
        //                'tr_user': 0,
        //                body: {
        //                    value: vm.reason,
        //                    summary: vm.reason
        //                }
        //            });
        //            toaster.pop('success', 'Suggestion submitted.');
        //            return transactionRequest.$save();
        //        });
        //    });
        //
        //    $modalInstance.close();
        //}

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    });
