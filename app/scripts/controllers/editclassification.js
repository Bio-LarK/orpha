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
        // vm.toggle = toggle;
        vm.addSubDisorder = addSubDisorder;
        vm.removeDisorder = removeDisorder;
        // vm.isEdited = isEdited;
        // vm.isRemoved = isRemoved;
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
            var root = $scope.tree[0];
            // root.open();
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

        ////////////////////////////////
        // Editing the classification //
        ////////////////////////////////

        function removeDisorder(scope) {
            // FIXME: the parent stuff is pretty awful, not sure how to do it though
            var currentParent = scope.$parent.$parent.$parent.node.resource;
            var node = scope.node;
            modalService.openEditClassificationRemoveDisorder(
                    vm.classification,
                    node.resource,
                    currentParent)
                .result.then(function() {
                    scope.remove();
                });
        }

        function addSubDisorder(scope) {
            var node = scope.node;
            modalService.openEditClassificationAddChild(vm.classification, node.resource)
                .result.then(function(disorder) {
                    node.insertChild(disorder, 0).then(function(child) {
                        console.log('child is', child);
                        child.isEdited = true;
                    });
                });
        }

        function disorderDragStarted(event) {
            // Close the children
            close(event.source.nodeScope.node);
        }

        function disorderCanDropHere(sourceNodeScope, destNodesScope, destIndex) {
            var node = sourceNodeScope.node;
            var newParent = destNodesScope.node;
            return node.isValidParent(newParent);
        }

        function disorderDropped(event) {
            // What are dropped?
            var disorder = event.source.nodeScope.node.resource;
            var node = event.source.nodeScope.node;
            var oldParentNode = event.source.nodesScope.node;
            var newParentNode = event.dest.nodesScope.node;

            var oldParent = event.source.nodesScope.node.resource;
            var newParent = event.dest.nodesScope.node.resource;
            var oldIndex = event.source.index;

            if (oldParent === newParent) {
                return;
            }
            modalService.openEditClassification(vm.classification, disorder, oldParent, newParent)
                .result.then(function() {
                    node.isEdited = true;
                }, function() {
                    disorderDroppedCancelled(oldParentNode, newParentNode, node,
                        disorder, oldParent, newParent, oldIndex);
                });
        }

        function disorderDroppedCancelled(oldParentNode, newParentNode, node,
                disorder, oldParent, newParent, oldIndex) {
                oldParentNode.insertChild(node, oldIndex);
                newParentNode.removeChild(node);
            }
    });
