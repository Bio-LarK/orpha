'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditdisordergeneCtrl
 * @description
 * # EditdisordergeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditDisorderGeneCtrl', function($scope, $http, $modalInstance, config,
        ENV, ListTransaction, $q, TransactionRequestRemoveGene, TransactionRequestEditGene) {
        var vm = this;
        var EDIT_TYPE = 'edit';
        var REMOVE_TYPE = 'remove';
        vm.disorderGene = config.relationshipNode;
        vm.gene = config.rightNode;
        vm.type = 'edit';
        vm.disorder = config.leftNode;
        vm.disorderGeneStatuses = null;
        vm.disorderGeneStatus = null;
        vm.disorderGeneTypes = null;
        vm.disorderGeneType = null;
        vm.reason = '';
        vm.cancel = cancel;
        vm.proposeChanges = proposeChanges;
        vm.edit = edit;
        vm.remove = remove;

        activate();

        ////////

        function activate() {
            getDisorderGeneStatuses();
            getDisorderGeneTypes();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function edit() {
            vm.type = EDIT_TYPE;
        }
        function remove() {
            vm.type = REMOVE_TYPE;
        }

        function proposeChanges() {
            var transactionRequest = getRequest();
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

        function hasStatusChanged() {
            return vm.disorderGene['disgene_as'].nid !== vm.disorderGeneStatus.nid;
        }

        function hasRelationshipTypeChanged() {
            return vm.disorderGene['disgene_at'].nid !== vm.disorderGeneType.nid;
        }

        function getDisorderGeneStatuses() {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': 'disorder_gene_as',
                    fields: 'nid,title'
                }
            }).then(function(response) {
                vm.disorderGeneStatuses = response.data;
                vm.disorderGeneStatus = _.find(vm.disorderGeneStatuses, {
                    nid: vm.disorderGene['disgene_as'].nid
                });
            });
        }

        function getDisorderGeneTypes() {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': 'disorder_gene_at',
                    fields: 'nid,title'
                }
            }).then(function(response) {
                vm.disorderGeneTypes = response.data;
                vm.disorderGeneType = _.find(vm.disorderGeneTypes, {
                    nid: vm.disorderGene['disgene_at'].nid
                });
            });
        }
    });
