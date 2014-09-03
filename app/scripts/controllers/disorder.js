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
        $scope.disorderTracker = promiseTracker();
        $scope.disorder = null;
        $scope.signsTracker = promiseTracker();
        $scope.genesTracker = promiseTracker();
        $scope.toggleParents = toggleParents;
        $scope.edit = edit;
        $scope.edit2 = edit2;
        activate();
        ////////////

        function activate() {
            var disorder = Disorder.get({
                nid: $stateParams.disorderId //136402
            }, function (disorder) {
                $scope.disorder = disorder;

                Page.setTitle(disorder['disorder_name']);

                var genesPromise = disorder.getGenes();
                var signsPromise = disorder.getSigns();

                $scope.signsTracker.addPromise(signsPromise);
                $scope.genesTracker.addPromise(genesPromise);
            });
            $scope.disorderTracker.addPromise(disorder.$promise);
            $scope.signsTracker.addPromise(disorder.$promise);
            $scope.genesTracker.addPromise(disorder.$promise);
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
                        return $scope.disorder;
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

        function edit2() {
            var modalInstance = $modal.open({
                templateUrl: 'views/edit.modal.html',
                controller: 'EditModalCtrl as editVm',
                // size: size,
                resolve: {
                    concept: function() {
                        return $scope.disorder;
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