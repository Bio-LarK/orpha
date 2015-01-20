'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
  .factory('TransactionRequestRemovePhenotype', function(TransactionRequest) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        var TransactionRequestRemovePhenotype = function(data) {
            TransactionRequest.call(this, data);
        };
        TransactionRequestRemovePhenotype.prototype = TransactionRequest.prototype;
        TransactionRequestRemovePhenotype.prototype.constructor = TransactionRequestRemovePhenotype;

        TransactionRequestRemovePhenotype.create = create;

        function create(disorder, phenotype, reason) {
            var transactionRequest = TransactionRequest.create();
            transactionRequest.setReason(reason);
            transactionRequest.addRemoveTransaction(disorder.nid, 'disorder_phenotype', phenotype.nid);
            transactionRequest.setTitle('Remove association between ' + disorder.title + ' and ' + phenotype.title);
            transactionRequest.setReason(reason);
            return transactionRequest;
        }

        return TransactionRequestRemovePhenotype;
  });
