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
        toaster, autocompleteService, EditPropertyTransactionRequest) {

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
        var currentSelectedOnsets = angular.copy(vm.concept[vm.propertyName]);
        vm.ageOfOnsetTypes = currentSelectedOnsets;
        vm.ageOfOnsets.selectedOnsets = currentSelectedOnsets;

        vm.refreshAgeOfOnsetTypes = function(term) {
            autocompleteService.autocomplete(vm.propertyContentType, term).then(function(ageOfOnsetTypes) {
                vm.ageOfOnsetTypes = ageOfOnsetTypes;
            });
        };

        function getAddedPropertyValues() {
            var addedPropertiesValues = _.reject(vm.ageOfOnsets.selectedOnsets, function (selectedOnset) {
                return _.find(vm.concept[vm.propertyName], {nid: selectedOnset.nid})
            });
            return addedPropertiesValues;
        }

        function getRemovedPropertyValues() {
            var removedPropertyValues = _.reject(vm.concept[vm.propertyName], function (originalOnset) {
                return _.find(vm.ageOfOnsets.selectedOnsets, {nid: originalOnset.nid})
            });
            return removedPropertyValues;
        }

        function save() {
            // create a new transaction
            //var transaction = new transaction();

            // save it
            var transactionRequest = EditPropertyTransactionRequest.create(vm.concept, vm.propertyLabel, vm.reason);

            // Add transactions
            _.forEach(getAddedPropertyValues(), function(addedPropertiesValue) {
                transactionRequest.addAddTransaction(vm.concept.nid, vm.propertyName, addedPropertiesValue.nid);
            });
            // Remove transactions
            _.forEach(getRemovedPropertyValues(), function(removedPropertyValue) {
                transactionRequest.addRemoveTransaction(vm.concept.nid, vm.propertyName, removedPropertyValue.nid);
            });
            transactionRequest.save();
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    });
