'use strict';

/**
 * @ngdoc service
 * @name orphaApp.ListTransaction
 * @description
 * # ListTransaction
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('ListTransaction', function($resource, ENV, $http, $q) {
        var ListTransaction = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'list_transaction',
            nid: '@nid'
        });
        ListTransaction.prototype.loadReferences = loadReferences;
        return ListTransaction;

        ////

        function loadReferences() {
        	/* jshint validthis: true */
            var listTransaction = this;
            listTransaction.title = 'Loading...';

            return $q.all([
            	loadNode(listTransaction),
            	loadSuggestedRef(listTransaction),
            	loadCurrentRef(listTransaction)
        	]).then(function() {
                listTransaction.title = listTransaction['ltrans_onnode'].title;
        		// Create the title
        		if(listTransaction['ltrans_onnode'].type === 'disorder_gene') {
        			listTransaction.title = 'Relationship between ' + 
        			listTransaction['ltrans_onnode']['disgene_disorder'].title + ' and ' + 
        			listTransaction['ltrans_onnode']['disgene_gene'].title;
        		}
        	});
            
        }

        function loadNode(listTransaction) {
        	var nodeId = listTransaction['ltrans_onnode'];
            var nodeRequest = {
                fields: 'nid,title,type,disgene_disorder,disgene_gene'
            };
            return $http.get(ENV.apiEndpoint + '/entity_node/' + nodeId, {
                params: nodeRequest
            }).then(function(response) {
            	listTransaction['ltrans_onnode'] = response.data;
            });
        }

        function loadSuggestedRef(listTransaction) {
        	var nodeId = listTransaction['ltrans_svalref'];
            var nodeRequest = {
                fields: 'nid,title'
            };
            return $http.get(ENV.apiEndpoint + '/entity_node/' + nodeId, {
                params: nodeRequest
            }).then(function(response) {
            	listTransaction['ltrans_svalref'] = response.data;
            });
        }

        function loadCurrentRef(listTransaction) {
        	var nodeId = listTransaction['ltrans_cvalref'];
            var nodeRequest = {
                fields: 'nid,title'
            };
            return $http.get(ENV.apiEndpoint + '/entity_node/' + nodeId, {
                params: nodeRequest
            }).then(function(response) {
            	listTransaction['ltrans_cvalref'] = response.data;
            });
        }

    });
