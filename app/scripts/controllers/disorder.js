'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisorderCtrl
 * @description
 * # DisorderCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisorderCtrl', function ($scope, $stateParams, Disorder, Page, promiseTracker, $modal, modalService) {
        var vm = $scope;
        vm.disorderTracker = promiseTracker();
        vm.disorder = null;
        vm.signsTracker = promiseTracker();
        vm.genesTracker = promiseTracker();
        vm.toggleParents = toggleParents;
        vm.editAgeOfOnset = editAgeOfOnset;
        vm.editPrevalenceClass = editPrevalenceClass;
        vm.editAgeOfDeath = editAgeOfDeath;
        vm.editGenotype = editGenotype; 
        vm.editDisorderGene = editDisorderGene;
        vm.isEditing = false;
        activate();
        ////////////

        function activate() {
            var disorder = Disorder.get({
                nid: $stateParams.disorderId //136402
            }, function (disorder) {
                vm.disorder = disorder;

                Page.setTitle(disorder['disorder_name']);

                var genesPromise = disorder.getGenes();
                var signsPromise = disorder.getSigns();

                vm.signsTracker.addPromise(signsPromise);
                vm.genesTracker.addPromise(genesPromise);
            });
            vm.disorderTracker.addPromise(disorder.$promise);
            vm.signsTracker.addPromise(disorder.$promise);
            vm.genesTracker.addPromise(disorder.$promise);
        }

        function toggleParents(disorder) {
            disorder.isShowingParents = !disorder.isShowingParents;
            disorder.getParents().then(function (disorders) {
                console.log('parents', disorders);
            });
        }

        function editAgeOfOnset() {
            return modalService.openAgeOfOnset(vm.disorder);
        }

        function editPrevalenceClass() {
            return modalService.openPrevalenceClassModal(vm.disorder);
        }
        function editAgeOfDeath() {
            return modalService.openAgeOfDeath(vm.disorder);
        }

        function editDisorderGene(disorderGene) {
            var modalInstance = $modal.open({
                templateUrl: 'views/editdisordergene.modal.html',
                controller: 'EditDisorderGeneCtrl as editVm',
                // size: size,
                resolve: {
                    disorderGene: function() {
                        return disorderGene;
                    },
                    gene: function() {
                        return disorderGene.disgene_gene;
                    },
                    disorder: function() {
                        return vm.disorder;
                    }
                }
            });
        }
        function editGenotype(node) {
            console.log('open modal', node);
            var modalInstance = $modal.open({
                templateUrl: 'views/edit.modal.html',
                controller: 'EditModalCtrl as editVm',
                // size: size,
                resolve: {
                    concept: function() {
                        return node;
                    },
                    propertyLabel: function() {
                        return 'Gene Relationship Type';
                    },
                    propertyName: function() {
                        return 'disgene_at';
                    },
                    propertyContentType: function() {
                        return 'disorder_gene_at';
                    }
                }
            });
        }

        

    });