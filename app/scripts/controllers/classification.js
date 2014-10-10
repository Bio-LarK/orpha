'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ClassificationCtrl
 * @description
 * # ClassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ClassificationCtrl', function($scope, $stateParams, $log, Disorder, 
        Classification, Page, searchService, $q) {
		var vm = this;

        vm.classification = null;
        vm.rootDisorder = null;
        
        vm.selectedDisorder = null;

        vm.selectDisorder = selectDisorder;
        vm.toggleOpen = toggleOpen;

        activate();
        ////////////

        function activate() {
            Classification.get({
                nid: $stateParams.classificationId //136402
            }, function (classification) {
                vm.classification = classification;
                Disorder.getRootForClassification(classification).then(function(rootDisorder) {
                    vm.rootDisorder = rootDisorder;
                    selectDisorder(vm.rootDisorder);
                });
                Page.setTitle(classification['title']);
            });
        }

        function selectDisorder(disorder) {
            vm.selectedDisorder = disorder;            
            open(disorder);
        }

        function toggleOpen(disorder) {
            if(disorder.isOpen) {
                close(disorder);
                return;
            }
            open(disorder);
        }
        function open(disorder) {
            disorder.isOpen = true;
            disorder.loadChildren();
        }
        function close(disorder) {
            disorder.isOpen = false;
            _.each(disorder['disorder_child'], function(child) {
                close(child);
            });
        }
        
        // function selectDisorder(disorder, openChild) {
        //     vm.history.push(vm.disorder);

        //     vm.disorder = disorder;
        //     disorder.loadChildren().then(function(children) {
        //         openChild = _.find(children, {nid: openChild.nid});
        //         openChild.isOpen = true;
        //     });
        // }

        // function selectParent() {
        //     $log.debug('history', vm.history);
        //     vm.disorder = vm.history.pop();
        // }

        function searchDisorder(text) {
            searchService.search(text).then(function(results) {
                $log.debug('results', results);
                if(results.length) {
                    searchSelectResult(results[0]);
                }
                
            });
        }

        function searchSelectResult(result) {

            Disorder.get({nid: result.node}).$promise.then(function(disorder) {
                vm.selectedDisorder = disorder;
                loadParents(disorder);
            });
        }

        function loadParents(disorder) {
            disorder.isOpen = true;
            vm.disorder = disorder;
            $log.debug('loading parents for', disorder.disorder_name);
            return disorder.loadParents(vm.classification).then(function(parents) {
                var promises = _.map(parents, function(parent) {
                    $log.debug('getting parents of parent', parent.disorder_name);
                    return loadParents(parent);
                });
                return $q.all(promises);
            });
        }

    });
