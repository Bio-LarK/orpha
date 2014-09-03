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
    activate();

    ///////

    function activate() {
    	suggestionService.getNewSuggestions().then(function(suggestions) {
        console.log('got suggestions', suggestions);
        vm.suggestions = suggestions;
      });
    }
  });
