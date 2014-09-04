'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditdisordergeneCtrl
 * @description
 * # EditdisordergeneCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditDisorderGeneCtrl', function($scope, $http, $modalInstance, disorder, gene, disorderGene, ENV, ListTransaction) {
        var vm = this;
        vm.disorderGene = disorderGene;
        vm.gene = gene;
        vm.proposalType = 'edit';
        vm.disorder = disorder;
        vm.disorderGeneStatuses = null;
        vm.disorderGeneStatus = null;
        vm.disorderGeneTypes = null;
        vm.disorderGeneType = null;
        vm.cancel = cancel;
        vm.proposeChanges = proposeChanges;

        activate();

        ////////

        function activate() {
            getDisorderGeneStatuses();
            getDisorderGeneTypes();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function proposeChanges() {
            // debugger;
            if (vm.proposalType !== 'edit') {
                console.log('No way to store a remove at this time');
            } else {
                if (vm.disorderGene['disgene_as'].nid !== vm.disorderGeneStatus.nid) {
                    var propertyName = 'disgene_as';
                    var listTransaction = new ListTransaction({
                        title: 'transaction',
                        type: 'list_transaction',

                        ltrans_position: '0',
                        ltrans_onnode: vm.disorderGene.nid,
                        ltrans_onprop: propertyName,
                        ltrans_svalref: vm.disorderGeneStatus.nid,
                        ltrans_cvalref: vm.disorderGene[propertyName].nid
                    });
                    listTransaction.$save();
                }

                if (vm.disorderGene['disgene_at'].nid !== vm.disorderGeneType.nid) {
                    var propertyName = 'disgene_at';
                    var listTransaction = new ListTransaction({
                        title: 'transaction',
                        type: 'list_transaction',

                        ltrans_position: '0',
                        ltrans_onnode: vm.disorderGene.nid,
                        ltrans_onprop: propertyName,
                        ltrans_svalref: vm.disorderGeneType.nid,
                        ltrans_cvalref: vm.disorderGene[propertyName].nid
                    });
                    listTransaction.$save();
                }
                
                $modalInstance.dismiss('cancel');
                // lets just deal with curated for now
                // if(vm.disorderGene) {}
            }
            // check which type of suggestion it is
            // remove or edit
            // Check if status 
            // Create a list transaction

            // Create a transaction request

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
