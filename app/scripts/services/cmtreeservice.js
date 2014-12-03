'use strict';

/**
 * @ngdoc service
 * @name orphaApp.cmTreeService
 * @description
 * # cmTreeService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('cmTreeService', function(Disorder, $log, Classification, CmTreeNode) {
        var service = {};
        service.getTreeForDisorder = getTreeForDisorder;
        service.getTree = getTree;
        return service;

        ////////////

        function getTree(classificationId) {
            return Disorder.getRootForClassification({
                nid: classificationId
            }).then(function(rootDisorder) {
                var root = new CmTreeNode(rootDisorder);
                return [root];
                // return [ new CmTreeNode(rootDisorder)];
            });
        }

        function getTreeForDisorder(classificationId, disorderId) {
            return Disorder.get({
                nid: disorderId
            }).$promise.then(function(disorder) {
                var node = new CmTreeNode(disorder);
                return node.open().then(function() {
                    console.log('its open!', node.resource.title);
                    return findRoot(node, classificationId).then(function(rootNode) {
                        return [rootNode];
                    });
                });
                // node._isOpen = true;

            });
        }

        function findRoot(node, classificationId) {
            // FIXME: get parents need to do parnet child stuff here
            // instead of the disorder service
            return node.resource.getParents({
                nid: classificationId
            }).then(function(parents) {
                var isRoot = !parents || !parents.length;
                if (isRoot) {
                    console.log('its open root!', node.resource.title);
                    return node.open().then(function() {
                        return node;
                    });
                }
                // ignore multple parents for now
                if (parents.length > 1) {
                    $log.info('Disorder:', node.resource.title, 'has multiple parents', parents);
                }

                // get the first parent
                // TODO: allow multiple parents
                var singleParent = new CmTreeNode(parents[0]);
                return singleParent.open().then(function() {
                    singleParent.updateChild(node);
                    // console.log('children', children.length);
                    
                    // console.log('index', index);
                    // singleParent.removeAtIndex(index);
                    // singleParent.insertChild(node, 0);
                    // console.log('children', children.length);
                    // console.log('its open parent!', node.resource.title);
                    return findRoot(singleParent, classificationId);
                });
                // singleParent._isOpen = true;
                // singleParent._isOpen = true;

            });
        }




    });
