'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:ModaleditclassificationCtrl
 * @description
 * # ModaleditclassificationCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('ModalEditClassificationCtrl', function($scope, config, $modalInstance) {
    	var vm = this;
    	vm.classification = config.classification;
    	vm.disorder = config.disorder;
    	vm.parent = config.parent;
    	vm.newParent = config.newParent;

	 	vm.proposeChanges = proposeChanges;
    	vm.cancel = cancel; 

    	function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function proposeChanges() {
        	$modalInstance.dismiss('cancel');
        }
    });
