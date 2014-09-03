'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:SuggestionsCtrl
 * @description
 * # SuggestionsCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
  .controller('SuggestionsCtrl', function ($http, $scope, ENV, suggestionService) {
    var vm = this;
    vm.test = 'hello world';
    vm.approve = approve;
    activate();

    ///////

    function activate() {
    	suggestionService.getNewSuggestions().then(function(suggestions) {
        console.log('got suggestions', suggestions);
        vm.suggestions = suggestions;
      });
    }

    function approve(listTransaction) {
      console.log('approving', listTransaction);
      vm.suggestions = _.without(vm.suggestions, listTransaction);
      listTransaction.$remove();
    }
  });
