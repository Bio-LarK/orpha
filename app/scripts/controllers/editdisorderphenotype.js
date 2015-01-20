'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditdisorderphenotypeCtrl
 * @description
 * # EditdisorderphenotypeCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditDisorderPhenotypeCtrl', function($scope, $http, $modalInstance,
        config, ENV, ListTransaction, $q, TransactionRequest, TransactionRequestRemovePhenotype,
        toaster, transactionStatusService) {
        var vm = this;
        var EDIT_TYPE = 'edit';
        var REMOVE_TYPE = 'remove';
        vm.disorderSign = config.relationshipNode;
        vm.disorder = config.leftNode;
        vm.sign = config.rightNode;
        vm.type = EDIT_TYPE;
        vm.disorderSignFrequencies = null;
        vm.reason = null;
        vm.cancel = cancel;
        vm.proposeChanges = proposeChanges;

        activate();

        ////////

        function activate() {
            getSignFrequencies();
            //console.log("remove phenotype?", TransactionRequestRemovePhenotype);
            // getDisorderGeneTypes();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }


        function getSignFrequencies() {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': 'sign_frequency',
                    fields: 'nid,title'
                }
            }).then(function(response) {
                vm.disorderSignFrequencies = response.data;
                vm.disorderSignFrequency = _.find(vm.disorderSignFrequencies, {
                    nid: vm.disorderSign['ds_frequency'].nid
                });
            });
        }

        function proposeChanges() {

            var propertyName = 'ds_frequency';
            var listTransaction = new ListTransaction({
                title: 'transaction',
                type: 'list_transaction',

                ltrans_position: 0,
                ltrans_onnode: vm.disorderSign.nid,
                ltrans_onprop: propertyName,
                ltrans_svalref: vm.disorderSignFrequency.nid,
                ltrans_cvalref: vm.disorderSign[propertyName].nid
            });
            listTransaction.$save().then(function(listTransaction) {
                // var transactionIds = _.pluck(cats, 'nid');
                // Add it to a transaction request
                return transactionStatusService.loadStatusCodes().then(function() {
                    var transactionRequest = new TransactionRequest({
                        title: 'Relationship between ' + vm.disorder.title + ' and ' + vm.sign.title,
                        type: 'transaction_request',
                        'tr_timestamp': new Date().getTime() / 1000,
                        'tr_trans': [
                            listTransaction.nid
                        ],
                        'tr_status': transactionStatusService.submittedNid,
                        'tr_user': 0,
                        body: {
                            value: vm.reason,
                            summary: vm.reason
                        }
                    });
                    toaster.pop('success', 'Suggestion submitted.');
                    return transactionRequest.$save();
                });

            });

            $modalInstance.dismiss('cancel');
        }
    });
