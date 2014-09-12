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
        vm.editDisorderGene = editDisorderGene;
        vm.editDisorderPhenotype = editDisorderPhenotype;
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
            var config = {
                relationshipNode: disorderGene,
                leftNode: vm.disorder, 
                rightNode: disorderGene.disgene_gene
            };

            var modalInstance = $modal.open({
                templateUrl: 'views/editdisordergene.modal.html',
                controller: 'EditDisorderGeneCtrl as editVm',
                // size: size,
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
        }

        function editDisorderPhenotype(disorderSign) {
            var config = {
                relationshipNode: disorderSign,
                leftNode: vm.disorder, 
                rightNode: disorderSign.ds_sign
            };
            var modalInstance = $modal.open({
                templateUrl: 'views/editdisorderphenotype.modal.html',
                controller: 'EditDisorderPhenotypeCtrl as vm',
                // size: size,
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
        }


    });