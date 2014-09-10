'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:DisorderCtrl
 * @description
 * # DisorderCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('DisorderCtrl', function ($scope, $stateParams, Disorder, Page, promiseTracker, $modal) {
        var vm = $scope;
        vm.disorderTracker = promiseTracker();
        vm.disorder = null;
        vm.signsTracker = promiseTracker();
        vm.genesTracker = promiseTracker();
        vm.toggleParents = toggleParents;
        vm.edit = edit;
        vm.edit2 = edit2;
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

        function edit() {
            var modalInstance = $modal.open({
                templateUrl: 'views/edit.modal.html',
                controller: 'EditModalCtrl as editVm',
                // size: size,
                resolve: {
                    concept: function() {
                        return vm.disorder;
                    },
                    propertyLabel: function() {
                        return 'Prevalence Class';
                    },
                    propertyName: function() {
                        return 'disorder_prevalence';
                    },
                    propertyContentType: function() {
                        return 'prevalence_class';
                    }
                }
            });
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


        function edit2() {
            var modalInstance = $modal.open({
                templateUrl: 'views/edit.modal.html',
                controller: 'EditModalCtrl as editVm',
                // size: size,
                resolve: {
                    concept: function() {
                        return vm.disorder;
                    },
                    propertyLabel: function() {
                        return 'Age of Onset';
                    },
                    propertyName: function() {
                        return 'disorder_onset';
                    },
                    propertyContentType: function() {
                        return 'age_of_onset';
                    }
                }
            });
        }


    });