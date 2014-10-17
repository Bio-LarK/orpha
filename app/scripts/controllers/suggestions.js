'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SuggestionsCtrl
 * @description
 * # SuggestionsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SuggestionsCtrl', function($http, $scope, ENV, suggestionService, 
        TransactionRequest, $log, $q, transactionStatusService, Page) {
        var vm = this;
        vm.suggestions = null;
        vm.openSuggestions = null;
        vm.closedSuggestions = null;
        vm.isShowingOpen = true;
        vm.suggestionTypeChanged = suggestionTypeChanged;
        activate();

        ///////

        function activate() {
            Page.setTitle('Suggestions');
            
            return transactionStatusService.loadStatusCodes().then(function() {
                // Load all transation requests
                TransactionRequest.getOpen().then(function(suggestions) {
                    vm.openSuggestions = suggestions;
                    vm.suggestions = vm.openSuggestions;
                });
                TransactionRequest.getClosed().then(function(suggestions) {
                    vm.closedSuggestions = suggestions;
                });
            });
        }

        // function getSubmittedTransactions() {
        //     return getTransactions(transactionStatusService.submittedNid);
        // }
        // function getClosedTransactions() {
        //     return $q.all([
        //         getTransactions(transactionStatusService.acceptedNid),
        //         getTransactions(transactionStatusService.rejectedNid)
        //     ]).then(function(transactions) {
        //         return _.flatten(transactions);
        //     });
        // }
        // function getTransactions(status) {
        //     return TransactionRequest.query({
        //         'parameters[tr_status]': status,
        //     }).$promise.then(function(suggestions) {
        //         return suggestions;
        //     }, function() {
        //         return [];
        //     });
        // }

        function suggestionTypeChanged(isShowingOpen) {
            vm.suggestions = null;
            if(isShowingOpen) {
                vm.suggestions = vm.openSuggestions;
            } else {
                vm.suggestions = vm.closedSuggestions;
            }
        }
    });
