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
        Classification, Page, searchService, $q, $location) {
        var vm = this;

        vm.classification = null;
        vm.rootDisorder = null;

        vm.selectedDisorder = null;

        vm.initialDisorder = null;
        vm.selectDisorder = selectDisorder;
        vm.toggleOpen = toggleOpen;

        activate();

        ////////////

        function activate() {
            
            if($stateParams.disorderId) {
                locateInTree();    
            } else {
                loadClassificationTree();  
            } 
        }

        function locateInTree() {
            Page.setTitle('Locating...');
            Disorder.get({
                nid: $stateParams.disorderId
            }).$promise.then(function(disorder) {
                $log.debug('selected disorder', disorder, disorder.title, disorder.nid);
                vm.initialDisorder = disorder;
                // does the disorder have children?
                // if so, its in the tree, so we can select it there,
                // otherwise, we will need to do something with its parent
                if(disorder.disorder_child.length) {
                    selectDisorder(disorder);    
                }
                openParents(disorder);
            });
        }

        function openParents(disorder) {
            $log.debug('opening parents', disorder);
            disorder.getParents({nid:$stateParams.classificationId}).then(function(parents) {
                if(!parents || !parents.length) {
                    vm.rootDisorder = disorder;
                    // vm.classification = disorder['disorder_class'];
                    vm.classification = _.find(disorder['disorder_class'], {nid: $stateParams.classificationId});
                    Classification.get({nid: vm.classification.nid}).$promise.then(function(classification) {
                        vm.classification = classification;
                        Page.setTitle(vm.initialDisorder.title + ' in ' + vm.classification.title);
                    });
                    $log.debug('root disorder class', vm.rootDisorder, vm.classification);
                    return;
                }
                $log.debug('parents are', parents);
                var singleParent = parents[0];
                vm.rootDisorder = singleParent;
                singleParent.isOpen = true;
                if(!vm.selectedDisorder) {
                    selectDisorder(singleParent);
                }
                // vm.rootDisorder = parents[0];
                // vm.rootDisorder.isOpen = true;
                openParents(singleParent);

            }); 
        }




        function loadClassificationTree() {
            return Classification.get({
                nid: $stateParams.classificationId //136402
            }, function(classification) {
                vm.classification = classification;
                Page.setTitle(classification['title']);
                return Disorder.getRootForClassification(classification).then(function(rootDisorder) {
                    vm.rootDisorder = rootDisorder;
                    selectDisorder(vm.rootDisorder);
                });
            });
        }

        function selectDisorder(disorder) {
            vm.selectedDisorder = disorder;
            return open(disorder);
        }

        function toggleOpen(disorder) {
            if (disorder.isOpen) {
                close(disorder);
                return;
            }
            return open(disorder);
        }

        function open(disorder) {
            disorder.isOpen = true;
            return disorder.loadChildren();
        }

        function close(disorder) {
            disorder.isOpen = false;
            _.each(disorder['disorder_child'], function(child) {
                close(child);
            });
        }

        function locate(disorder) {
            if (disorder.nid !== $stateParams.disorderId) {
                open(disorder).then(function(children) {
                    $log.debug('got children', children);
                    _.each(children, function(child) {
                        $log.debug('checking children', child);
                        locate(disorder);
                    });
                });
            } else {
                vm.selectedDisorder = disorder;
            }
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
                if (results.length) {
                    searchSelectResult(results[0]);
                }

            });
        }

        function searchSelectResult(result) {

            Disorder.get({
                nid: result.node
            }).$promise.then(function(disorder) {
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
