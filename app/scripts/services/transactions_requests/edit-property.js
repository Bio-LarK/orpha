'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .factory('EditPropertyTransactionRequest', function(TransactionRequest) {

        return {
            create: create
        };

        ///

        function create(disorder, propertyLabel, reason) {
            // FIXME: I want this to be in the constructor somehow
            var transactionRequest = TransactionRequest.create();
            transactionRequest.setTitle('Edit the ' + propertyLabel + ' for ' + disorder.title);
            transactionRequest.setReason(reason);
            return transactionRequest;
        }
    });



//angular.module('orphaApp')
//    .factory('ChangeAgeOfOnsetTransaction', function(Transaction) {
//
//        return {
//            createTransaction: createTransaction
//        };
//
//        ///
//
//        function createTransaction(disorder, reason) {
//            var transactionRequest = Transaction.create();
//            transactionRequest.setTitle('Change the Age of Onset for ' + disorder.title);
//            transactionRequest.setReason(reason);
//            return transactionRequest;
//        }
//
//    });