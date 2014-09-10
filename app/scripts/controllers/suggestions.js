'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SuggestionsCtrl
 * @description
 * # SuggestionsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('SuggestionsCtrl', function($http, $scope, ENV, suggestionService, TransactionRequest) {
        var vm = this;
        vm.suggestions = null;
        vm.isShowingOpen = true;
        activate();

        ///////

        function activate() {
            // Load all transation requests
            TransactionRequest.query({
                'parameters[tr_status]': 3,
                fields: 'nid,title,tr_status,tr_timestamp,tr_user,tr_trans,created,author'
            }).$promise.then(function(suggestions) {
                vm.suggestions = suggestions;
            });


         // suggestionService.getNewSuggestions().then(function(suggestions) {
            //    console.log('got suggestions', suggestions);
            //    vm.suggestions = suggestions;
            //  });
        }
    });
