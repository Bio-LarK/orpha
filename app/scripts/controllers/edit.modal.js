'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditModalCtrl
 * @description
 * # EditModalCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditModalCtrl', function($scope, $http, $modalInstance, config,
        toaster, autocompleteService, EditPropertyTransactionRequest) {

        var vm = this;
        vm.concept = config.concept;
        vm.propertyName = config.propertyName;
        vm.propertyContentType = config.propertyContentType;
        vm.propertyLabel = config.propertyLabel;
        vm.reason = '';
        vm.save = save;
        vm.cancel = cancel;


        vm.ageOfOnsets = {
            selectedOnsets: []
        };

        // FIXME: issue with preselecting items on ui-select
        // See github
        // https://github.com/angular-ui/ui-select/issues/404
        var currentSelectedOnsets = angular.copy(vm.concept[vm.propertyName]);
        if(_.isArray(currentSelectedOnsets)) {
            vm.isMultiple = true;
            vm.ageOfOnsetTypes = currentSelectedOnsets;
        } else {
            vm.isMultiple = false;
            vm.ageOfOnsetTypes = [currentSelectedOnsets];
        }

        // FIXME: change to a more generic name (since its not just age of onset)

        vm.ageOfOnsets.selectedOnsets = currentSelectedOnsets;
        vm.refreshAgeOfOnsetTypes = refreshAgeOfOnsetTypes;

        function save() {
            // create a new transaction
            //var transaction = new transaction();

            // save it
            var transactionRequest = EditPropertyTransactionRequest.create(vm.concept, vm.propertyLabel, vm.reason);

            // FIXME: probably this type switching should be pull out
            if(vm.isMultiple) {
                // Add transactions
                _.forEach(getAddedPropertyValues(), function(addedPropertiesValue) {
                    transactionRequest.addAddTransaction(vm.concept.nid, vm.propertyName, addedPropertiesValue.nid);
                });
                // Remove transactions
                _.forEach(getRemovedPropertyValues(), function(removedPropertyValue) {
                    transactionRequest.addRemoveTransaction(vm.concept.nid, vm.propertyName, removedPropertyValue.nid);
                });
            } else {
                transactionRequest.addChangeTransaction(vm.concept.nid, vm.propertyName, vm.concept[vm.propertyName].nid, vm.ageOfOnsets.selectedOnsets.nid);
            }

            transactionRequest.save();
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function refreshAgeOfOnsetTypes(term) {
            return autocompleteService.autocomplete(vm.propertyContentType, term).then(function(ageOfOnsetTypes) {
                //vm.ageOfOnsetTypes = ageOfOnsetTypes;
                if(vm.isMultiple) {
                    vm.ageOfOnsetTypes = without(ageOfOnsetTypes, vm.ageOfOnsets.selectedOnsets, 'nid');
                    return;
                }

                vm.ageOfOnsetTypes = ageOfOnsetTypes;

            });
        }

        /**
         * Get all the new property values
         * @returns {*}
         */
        function getAddedPropertyValues() {
            var originalValues = vm.concept[vm.propertyName];
            var newValues = vm.ageOfOnsets.selectedOnsets;

            return without(newValues, originalValues, 'nid');
        }

        /**
         * Get all the property values that were removed
         * @returns {*}
         */
        function getRemovedPropertyValues() {
            var originalValues = vm.concept[vm.propertyName];
            var newValues = vm.ageOfOnsets.selectedOnsets;

            return without(originalValues, newValues, 'nid');
        }


        // TODO: extract to service
        /**
         * Get all items in the array, that arent in the second array
         * @param array
         * @param minusArray
         * @param property
         * @returns {*}
         */
        function without(array, minusArray, property) {
            return _.reject(array, function (item) {
                var where = {};
                where[property] = item[property];
                return _.find(minusArray, where);
            });
        }
    });
