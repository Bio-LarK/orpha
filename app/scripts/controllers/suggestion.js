'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
  .controller('SuggestionCtrl', function ($stateParams, TransactionRequest, $state, $http) {
    	var vm = this;
        vm.accept = accept;
    	activate();

    	//////////
    	function activate() {
            TransactionRequest.get({
                nid: $stateParams.suggestionId
            }).$promise.then(function(transactionRequest) {
                vm.request = transactionRequest;
                console.log(transactionRequest);
                _.each(transactionRequest['$tr_trans'], function(listTransaction) {
                    listTransaction.loadReferences();
                });
                console.log(transactionRequest);
            });
    	}

        function accept(request) {
            request['tr_status'] = 1;
            request.$update().then(function() {
                $state.go('suggestions');    
            });
            
        }
  });
