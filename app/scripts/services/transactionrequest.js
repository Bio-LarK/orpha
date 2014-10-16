'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionrequest
 * @description
 * # transactionrequest
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('TransactionRequest', function($resource, $http, ENV, ListTransaction, 
        $q, $state, $log, transactionStatusService) {
        var TransactionRequest = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'transaction_request',
            nid: '@nid'
        }, {
            get: {
                method: 'GET',
                transformResponse: $http.defaults.transformResponse.concat([
                    transformGetResponse
                ])
            },
            'update': {
                method: 'PUT'
            }
        });

        TransactionRequest.prototype.loadTransactions = loadTransactions;
        TransactionRequest.prototype.loadDescription = loadDescription;
        TransactionRequest.prototype.accept = accept;
        TransactionRequest.prototype.reject = reject;

        TransactionRequest.getOpen = getOpen;
        TransactionRequest.getClosed = getClosed;
        return TransactionRequest;

        ///////////////////

        function getOpen(page) {
            if(!page) {
                page = 0;
            }
            return transactionStatusService.loadStatusCodes().then(function() {
                return TransactionRequest.query({
                    'parameters[tr_status]': transactionStatusService.submittedNid,
                    page: page
                }).$promise.then(function(transactionRequest) {
                    return transactionRequest;
                }, function() {
                    return [];
                });
            });
        }
        function getClosed(page) {
            if(!page) {
                page = 0;
            }
            return transactionStatusService.loadStatusCodes().then(function() {
                var promise1 = TransactionRequest.query({
                    'parameters[tr_status]': transactionStatusService.acceptedNid,
                    page: page
                }).$promise.then(function(transactionRequests) {
                    return transactionRequests;
                }, function() {
                    return [];
                });
                var promise2 = TransactionRequest.query({
                    'parameters[tr_status]': transactionStatusService.rejectedNid,
                    page: page
                }).$promise.then(function(transactionRequests) {
                    return transactionRequests;
                }, function() {
                    return [];
                });
                return $q.all([promise1, promise2]).then(function(requests) {
                    return _.flatten(requests);
                });
            });
        }

        function transformGetResponse(transactionRequest, headersGetter) {
            return transactionRequest;
        }

        function accept() {
            /* jshint validthis: true */
            var transactionRequest = this;
            return transactionStatusService.loadStatusCodes().then(function() {
                return $http.put(ENV.apiEndpoint + '/entity_node/' + transactionRequest.nid, {
                    nid: transactionRequest.nid,
                    tr_status: transactionStatusService.acceptedNid
                });
            });
        }

        function reject() {
            /* jshint validthis: true */
            var transactionRequest = this;
            return transactionStatusService.loadStatusCodes().then(function() {
                return $http.put(ENV.apiEndpoint + '/entity_node/' + transactionRequest.nid, {
                    nid: transactionRequest.nid,
                    tr_status: transactionStatusService.rejectedNid
                });
            });
        }

        function loadDescription() {
            /* jshint validthis: true */
            var transactionRequest = this;
            // Get the nodes
            if(!transactionRequest['tr_trans'].length) {
                return transactionRequest.title;
            }
            var listTransaction = transactionRequest['tr_trans'][0];
            var node = listTransaction['ltrans_onnode'];
            if(node.type !== 'disorder_gene') {
                var params = {};
                params[node.type + 'Id'] = node.nid;
                transactionRequest.description = '<a href="' + 
                $state.href(node.type, params) + '">' + node.title + '</a>';
                return;
            }
            transactionRequest.description = 'Relationship between <a href="' + 
                $state.href('gene', {'geneId' :node['disgene_gene'].nid}) + '">' + 
                node['disgene_gene'].title + '<a/> and ' + 
                '<a href="' + $state.href('disorder', {'disorderId' :node['disgene_disorder'].nid}) + '">' + 
                node['disgene_disorder'].title + '</a>';
        }

        function loadTransactions() {
            /* jshint validthis: true */
            var transactionRequest = this;
            transactionRequest.description = 'Loading...';
            var ids = _.pluck(transactionRequest['tr_trans'], 'nid');
            if (!ids.length) {
                return $q.when([]);
            }
            var request = _.indexBy(ids, function(ids, index) {
                return 'parameters[nid][' + index + ']';
            });
            return ListTransaction.query(request).$promise.then(function(listTransactions) {
                transactionRequest['tr_trans'] = listTransactions;
                var promises = _.map(listTransactions, function(listTransaction) {
                    return listTransaction.loadReferences();
                });
                return $q.all(promises).then(function() {
                    return listTransactions;
                });
            });
        }

    });
