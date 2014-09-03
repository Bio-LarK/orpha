'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:EditModalCtrl
 * @description
 * # EditModalCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('EditModalCtrl', function($scope, $http, $modalInstance, 
    	ENV, PrevalenceClass, ListTransaction, concept, propertyName, propertyContentType, propertyLabel) {

    	var vm = this;
    	vm.concept = concept;
    	vm.propertyName = propertyName;
    	vm.propertyContentType = propertyContentType;
        vm.propertyLabel = propertyLabel;
    	vm.save = save;
    	vm.cancel = cancel;
    	vm.stuff = null;
    	vm.prevalenceClasses = null;
    	vm.prevalenceClass = null;


    	activate();

    	// node
    	// property
    	// model
    	// label name for the model, that the property points to
    	// select, 

    	////

    	function activate() {
    		getPrevalenceClasses();
    	}

    	function getPrevalenceClasses() {
    		return $http.get(ENV.apiEndpoint + '/entity_node', {
    			params: {
    				'parameters[type]': propertyContentType,
    				fields: 'nid,title'
    			}
    		}).then(function(response) {
    			vm.prevalenceClasses = response.data;
    		});
    	}

        function save(yo) {
        	console.log('saving');
            var listTransaction = new ListTransaction({
                title: 'transaction',
                type: 'list_transaction',

                ltrans_position: '0',
                ltrans_onnode: concept.nid,
                ltrans_onprop: propertyName,
                ltrans_svalref: vm.prevalenceClass.nid,
                ltrans_cvalref: concept[propertyName].nid
            });
            listTransaction.$save();
            $modalInstance.close();
        }

        function cancel() {
        	$modalInstance.dismiss('cancel');
        }

    });
