'use strict';

/**
 * @ngdoc service
 * @name orphaApp.cmTreeService
 * @description
 * # cmTreeService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('cmTreeService', function(Disorder, $log, Classification) {
        var service = {};
        service.getTreeForDisorderInClassification = getTreeForDisorder;
        service.getTree = getTree;
        return service;

        ////////////

        function getTree(classificationId) {
            return Disorder.getRootForClassification({nid: classificationId}).then(function(rootDisorder) {
                return [rootDisorder];
            });
        }

        function getTreeForDisorder(disorderId, classificationId) {
            return Disorder.get({
                nid: disorderId
            }).$promise.then(function(disorder) {
                return findRoot(disorder).then(function(root) {
                    return [root];
                });
            });
        }

        function findRoot(disorder, classificationId) {
            // FIXME: get parents need to do parnet child stuff here
            // instead of the disorder service
            return disorder.getParents({
                nid: classificationId
            }).then(function(parents) {
                var isRoot = !parents || !parents.length;
                if (isRoot) {
                    return disorder;
                }
                // ignore multple parents for now
                if(parents.length > 1) {
                    $log.info('Disorder:', disorder.title, 'has multiple parents', parents);
                }

                // get the first parent
                // TODO: allow multiple parents
                var singleParent = parents[0];
                return findRoot(singleParent);
            });
        }
    });
