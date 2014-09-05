'use strict';

/**
 * @ngdoc service
 * @name orphaApp.Suggestion
 * @description
 * # Suggestion
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('suggestionService', function($http, ENV, ListTransaction) {
        var service = {
            getNewSuggestions: getNewSuggestions
        };
        return service;

        function getNewSuggestions() {
            return ListTransaction.query({}).$promise.then(function(listTransactions) {
                // var listTransactions = response.data;

                var refIds = _.pluck(listTransactions, 'ltrans_svalref');
                var request = _.indexBy(refIds, function(ids, index) {
                    return 'parameters[nid][' + index + ']';
                });
                request.fields = 'nid,title';
                $http.get(ENV.apiEndpoint + '/entity_node', {
                    params: request
                }).then(function(response) {
                    var suggestedValues = response.data;
                    _.each(listTransactions, function(listTransaction) {
                        listTransaction['ltrans_svalref'] = 
                        _.find(suggestedValues, {nid: listTransaction['ltrans_svalref']});
                    });
                });


                var conceptIds = _.pluck(listTransactions, 'ltrans_onnode');
                var conceptRequest = _.indexBy(conceptIds, function(ids, index) {
                    return 'parameters[nid][' + index + ']';
                });
                conceptRequest.fields = 'nid,title';
                $http.get(ENV.apiEndpoint + '/entity_node', {
                    params: conceptRequest
                }).then(function(response) {
                    var concepts = response.data;
                    _.each(listTransactions, function(listTransaction) {
                        listTransaction['ltrans_onnode'] = 
                        _.find(concepts, {nid: listTransaction['ltrans_onnode']});
                    });
                });

                var currentIds = _.pluck(listTransactions, 'ltrans_cvalref');
                var currentRequest = _.indexBy(currentIds, function(ids, index) {
                    return 'parameters[nid][' + index + ']';
                });
                currentRequest.fields = 'nid,title';
                $http.get(ENV.apiEndpoint + '/entity_node', {
                    params: currentRequest
                }).then(function(response) {
                    var currentValues = response.data;
                    _.each(listTransactions, function(listTransaction) {
                        listTransaction['ltrans_cvalref'] = 
                        _.find(currentValues, {nid: listTransaction['ltrans_cvalref']});
                    });
                });

                
                return listTransactions;
            });
        }

    });

///////
