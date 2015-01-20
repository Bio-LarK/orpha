'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .factory('TransactionRequestRemoveGene', function(TransactionRequest) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var TransactionRequestRemoveGene = function(data) {
            TransactionRequest.call(this, data);
        };
        TransactionRequestRemoveGene.prototype = TransactionRequest.prototype;
        TransactionRequestRemoveGene.prototype.constructor = TransactionRequestRemoveGene;

        TransactionRequestRemoveGene.create = create;

        function create(disorder, gene, reason) {
            var transactionRequest = TransactionRequest.create();
            transactionRequest.setReason(reason);
            transactionRequest.addRemoveTransaction(disorder.nid, 'disorder_gene', gene.nid);
            transactionRequest.setTitle('Remove association between ' + disorder.title + ' and ' + gene.title);
            transactionRequest.setReason(reason);
            return transactionRequest;
        }

        return TransactionRequestRemoveGene;
    });
