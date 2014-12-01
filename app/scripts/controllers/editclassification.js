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
        var editedDisorders = {};
        var removedDisorders = {};
        vm.toggle = toggle;
        vm.addSubDisorder = addSubDisorder;
        vm.removeDisorder = removeDisorder;
        vm.isEdited = isEdited;
        vm.isRemoved = isRemoved;
        activate();

        // TODO: add child
        // TODO: rmeove child
        // 
        vm.treeOptions = {
            dropped: disorderDropped,
            dragStart: disorderDragStarted,
            accept: disorderCanDropHere
        };

        function activate() {
            // Get the classification
            getClassification($stateParams.classificationId).then(function(classification) {

                if ($stateParams.disorderId) {
                    cmTreeService.getTreeForDisorder(
                        $stateParams.classificationId, 
                        $stateParams.disorderId).then(setTree);
                    return;
                }
                // Get the tree
                cmTreeService.getTree($stateParams.classificationId).then(setTree);
            });
            Page.setTitle('Edit Classification');
        }
        function setTree(tree) {
            $scope.tree = tree;
            open($scope.tree[0]);
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

        function removeDisorder(scope) {
            // FIXME: the parent stuff is pretty awful, not sure how to do it though
            var currentParent = scope.$parent.$parent.$parent.disorder;
            modalService.openEditClassificationRemoveDisorder(
                vm.classification,
                scope.disorder,
                currentParent).result.then(function() {
                setDisorderAsRemoved(scope.disorder);
                scope.remove();
            });
        }

        function addSubDisorder(scope) {
            scope.isAdding = true;
            var parent = scope.disorder;
            open(parent).then(function() {
                modalService.openEditClassificationAddChild(vm.classification, parent)
                    .result.then(function(disorder) {
                        parent.disorder_child.unshift(disorder);
                        setDisorderAsEdited(disorder);
                    });
            });
        }

        function disorderDragStarted(event) {
            // Close the children
            close(event.source.nodeScope.disorder);
        }

        function disorderCanDropHere(sourceNodeScope, destNodesScope, destIndex) {
            // FIXME: $parent.$parent is probably going to cause problems in the future
            var currentParent = sourceNodeScope.$parent.$parent.disorder;
            var newParent = destNodesScope.disorder;
            if (!newParent) {
                return false;
            }
            return true;
        }

        function disorderDropped(event) {
            // What are dropped?
            var disorder = event.source.nodeScope.disorder;
            var oldParent = event.source.nodesScope.disorder;
            var newParent = event.dest.nodesScope.disorder;
            var oldIndex = event.source.index;

            if (oldParent === newParent) {
                return;
            }
            modalService.openEditClassification(vm.classification, disorder, oldParent, newParent)
                .result.then(function() {
                    setDisorderAsEdited(disorder);
                }, function() {
                    disorderDroppedCancelled(disorder, oldParent, newParent, oldIndex);
                });
        }

        function disorderDroppedCancelled(disorder, oldParent, newParent, oldIndex) {
            var newIndex = newParent.disorder_child.indexOf(disorder);
            newParent.disorder_child.splice(newIndex, 1);
            oldParent.disorder_child.splice(oldIndex, 0, disorder);
        }
        function setDisorderAsEdited(disorder) {
            editedDisorders[disorder.nid] = true;
        }
        function isEdited(disorder) {
            return !!editedDisorders[disorder.nid];
        }
        function setDisorderAsRemoved(disorder) {
            removedDisorders[disorder.nid] = true;
        }
        function isRemoved(disorder) {
            return !!removedDisorders[disorder.nid];
        }
    });
