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
        $q, $state, $log, transactionStatusService, toaster) {
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
        TransactionRequest.prototype.addChangeTransaction = addChangeTransaction;
        TransactionRequest.prototype.addAddTransaction = addAddTransaction;
        TransactionRequest.prototype.addRemoveTransaction = addRemoveTransaction;
        TransactionRequest.prototype.setReason = setReason;
        TransactionRequest.prototype.setTitle = setTitle;
        TransactionRequest.prototype.save = save;
        TransactionRequest.prototype.getTransactions = getTransactions;
        TransactionRequest.prototype.addTransaction = addTransaction;

        TransactionRequest.getOpen = getOpen;
        TransactionRequest.getClosed = getClosed;
        TransactionRequest.create = create;
        return TransactionRequest;

        ///////////////////

        function create() {
            var transactionRequest = new TransactionRequest({
                title: 'test',
                type: 'transaction_request',
                'tr_timestamp': new Date().getTime() / 1000,
                'tr_user': 0,
                body: {
                    value: '',
                    summary: ''
                }
            });
            transactionRequest.$$transactions = [];
            return transactionRequest;
        }

        function setReason(reason) {
            /* jshint validthis: true */
            reason = reason || '';
            this.body.value = reason;
            this.body.summary = reason;
            console.log('it set reason');
            return this;
        }
        function setTitle(title) {
            /* jshint validthis: true */
            this.title = title;
            return this;
        }
        function getTransactions() {
            /* jshint validthis: true */
            return this.$$transactions;
        }
        function addTransaction(transaction) {
            /* jshint validthis: true */
            this.getTransactions().push(transaction);
            return this;
        }

        // TODO: Abstract these listTransctions into somewhere else
        function addChangeTransaction(nodeNid, propertyName, fromNid, toNid) {
            /* jshint validthis: true */
            var transaction = new ListTransaction({
                title: 'transaction',
                type: 'list_transaction',
                ltrans_position: this.getTransactions().length,
                ltrans_onnode: nodeNid,
                ltrans_onprop: propertyName,
                ltrans_svalref: fromNid,
                ltrans_cvalref: toNid
            });
            this.getTransactions().push(transaction);
            return this;
        }
        function addAddTransaction(nodeNid, propertyName, newNid) {
            /* jshint validthis: true */
            var transaction = new ListTransaction({
                title: 'transaction',
                type: 'list_transaction',
                ltrans_position: this.getTransactions().length,
                ltrans_onnode: nodeNid,
                ltrans_onprop: propertyName,
                ltrans_svalref: newNid,
                ltrans_cvalref: 0
            });
            this.getTransactions().push(transaction);
            return this;
        }
        function addRemoveTransaction(nodeNid, propertyName, currentNid) {
            /* jshint validthis: true */
            var transaction = new ListTransaction({
                title: 'transaction',
                type: 'list_transaction',
                ltrans_position: this.getTransactions().length,
                ltrans_onnode: nodeNid,
                ltrans_onprop: propertyName,
                ltrans_svalref: 0,
                ltrans_cvalref: currentNid
            });
            this.getTransactions().push(transaction);
            return this;
        }

        function save() {
            /* jshint validthis: true */
            var transactionRequest = this;
            var transactions = _.map(this.getTransactions(), function(transaction) {
                return transaction.$save();
            });
            // Save all the transactions
            return $q.all(transactions).then(function(savedTransactions) {
                var transactionIds = _.pluck(savedTransactions, 'nid');
                return transactionStatusService.loadStatusCodes().then(function() {
                    transactionRequest.tr_trans = transactionIds;
                    transactionRequest.tr_status = transactionStatusService.submittedNid;
                    return transactionRequest.$save();
                });
            }).then(function() {
                toaster.pop('success', 'Suggestion submitted.');
            });
        }

        function getOpen(page) {
            if (!page) {
                page = 0;
            }
            return transactionStatusService.loadStatusCodes().then(function() {
                return TransactionRequest.query({
                    'parameters[tr_status]': transactionStatusService.submittedNid,
                    page: page
                }).$promise.then(function(transactionRequests) {
                    if (transactionRequests.length !== 20) {
                        return transactionRequests;
                    }
                    return getOpen(page + 1).then(function(otherOpenTransactionRequests) {
                        return transactionRequests.concat(otherOpenTransactionRequests);
                    });
                }, function() {
                    return [];
                });
            });
        }

        function getClosed(page) {
            if (!page) {
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
                    var closedTransactionRequests = _.flatten(requests);
                    if (requests[0].length !== 20 && requests[1].length !== 20) {
                        return closedTransactionRequests;
                    }
                    return getClosed(page + 1).then(function(otherClosedTransactionRequests) {
                        return closedTransactionRequests.concat(otherClosedTransactionRequests);
                    });
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
            if (!transactionRequest['tr_trans'].length) {
                return transactionRequest.title;
            }
            var listTransaction = transactionRequest['tr_trans'][0];
            var node = listTransaction['ltrans_onnode'];
            if (node.type === 'disorder_gene') {
                transactionRequest.description = 'Relationship between <a href="' +
                    $state.href('gene', {
                        'geneId': node['disgene_gene'].nid
                    }) + '">' +
                    node['disgene_gene'].title + '<a/> and ' +
                    '<a href="' + $state.href('disorder', {
                        'disorderId': node['disgene_disorder'].nid
                    }) + '">' +
                    node['disgene_disorder'].title + '</a>';
                return;
            }

            if (node.type === 'disorder_sign') {
                transactionRequest.description = 'Relationship between <a href="' +
                    $state.href('sign', {
                        'signId': node['ds_sign'].nid
                    }) + '">' +
                    node['ds_sign'].title + '<a/> and ' +
                    '<a href="' + $state.href('disorder', {
                        'disorderId': node['ds_disorder'].nid
                    }) + '">' +
                    node['ds_disorder'].title + '</a>';
                return;
            }

            var params = {};
            params[node.type + 'Id'] = node.nid;
            transactionRequest.description = '<a href="' +
                $state.href(node.type, params) + '">' + node.title + '</a>';
            return;


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
