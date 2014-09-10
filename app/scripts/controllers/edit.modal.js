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
        ENV, ListTransaction, concept, propertyName, propertyContentType, propertyLabel, TransactionRequest) {

        var vm = this;
        vm.concept = concept;
        vm.propertyName = propertyName;
        vm.propertyContentType = propertyContentType;
        vm.propertyLabel = propertyLabel;
        vm.save = save;
        vm.cancel = cancel;
        vm.stuff = null;
        vm.prevalenceClasses = null;
        vm.prevalenceClass = null;
        vm.reason = '';

        activate();

        ////

        function activate() {
            getPropertyOptions();
        }

        function getPropertyOptions() {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': propertyContentType,
                    fields: 'nid,title'
                }
            }).then(function(response) {
                vm.prevalenceClasses = response.data;
                vm.prevalenceClass = _.find(vm.prevalenceClasses, {nid: concept[propertyName].nid});
            });
        }

        function save() {
            // Create a transaction
            var listTransaction = new ListTransaction({
                title: concept.title,
                type: 'list_transaction',
                'ltrans_position': 0,
                'ltrans_onnode': concept.nid,
                'ltrans_onprop': propertyName,
                'ltrans_svalref': vm.prevalenceClass.nid,
                'ltrans_cvalref': concept[propertyName].nid,
                body: {
                    value: vm.reason,
                    summary: vm.reason
                }
            });
            listTransaction.$save().then(function() {
                // Add it to a transaction request
                var transactionRequest = new TransactionRequest({
                    title: concept.title + ' - ' + propertyLabel,
                    type: 'transaction_request',
                    'tr_timestamp': new Date().getTime() / 1000,
                    'tr_trans': [
                        listTransaction.nid
                    ],
                    'tr_status': 3,
                    'tr_user': 0,
                    body: {
                        value: vm.reason,
                        summary: vm.reason
                    }
                });
                return transactionRequest.$save();
            });

            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    });
