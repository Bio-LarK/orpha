'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditclassificationCtrl
 * @description
 * # EditclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditClassificationCtrl', function($scope, $timeout,
        Classification, cmTreeService, $stateParams, modalService, Page) {
        var vm = this;
        vm.toggle = toggle;
        vm.addSubDisorder = addSubDisorder;
        vm.remove = remove;
        activate();

        // TODO: add child
        // TODO: rmeove child
        // 
        $scope.treeOptions = {
            dropped: disorderDropped,
            dragStart: disorderDragStarted
        };

        function activate() {
            // Get the classification
            getClassification($stateParams.classificationId).then(function(classification) {
                // Get the tree
                cmTreeService.getTree($stateParams.classificationId).then(function(tree) {
                    $scope.tree = tree;
                    $scope.tree[0].isOpen = true;
                });
            });
            Page.setTitle('Edit Classification');
        }

        function getClassification(classificationId) {
            return Classification.get({
                nid: classificationId
            }).$promise.then(function(classification) {
                vm.classification = classification;
                Page.setTitle('Edit ' + classification.title);
                return classification;
            });
        }

        function toggleOpen(disorder) {
            if (disorder.isOpen) {
                close(disorder);
                return;
            }
            return open(disorder);
        }

        function close(disorder) {
            disorder.isOpen = false;
            _.each(disorder['disorder_child'], function(child) {
                close(child);
            });
        }

        function open(disorder, parent) {
            disorder.isOpen = true;
            return disorder.loadChildren();
        }

        function toggle(disorder, scope) {
            if (disorder.isOpen) {
                close(disorder);
                return;
            }
            return open(disorder);
        }

        ////////////////////////////////
        // Editing the classification //
        ////////////////////////////////

        function remove(scope) {
            // TODO: show modal
            scope.remove();
        }

        function addSubDisorder(scope) {
            var parent = scope.disorder;
            open(parent).then(function() {
                modalService.openEditClassificationAddChild(vm.classification, parent).result.then(function(child) {
                    if(child) {
                        parent.disorder_child.unshift(child);    
                    }
                });
            });
        }

        function disorderDragStarted(event) {
            // Close the children
            close(event.source.nodeScope.disorder);
        }

        function disorderDropped(event) {
            // What are dropped?
            var disorder = event.source.nodeScope.disorder;
            var parent = event.source.nodesScope.disorder;
            var newParent = event.dest.nodesScope.disorder;

            if (parent === newParent) {
                return;
            }
            // Open modal
            $timeout(function() {
                modalService.openEditClassification(vm.classification, disorder, parent, newParent);
            }, 500);
            
        }

    });
