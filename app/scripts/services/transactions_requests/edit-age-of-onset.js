'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .factory('EditAgeOfOnsetTransactionRequest', function(TransactionRequest) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var EditAgeOfOnsetTransactionRequest = function(data) {
            TransactionRequest.call(this, data);
            this.$$transactions = [];
        };
        EditAgeOfOnsetTransactionRequest.create = create;
        EditAgeOfOnsetTransactionRequest.prototype = TransactionRequest.prototype;
        EditAgeOfOnsetTransactionRequest.prototype.constructor = TransactionRequestEditAgeOfOnset;
        //TransactionRequestEditAgeOfOnset.prototype.changeRelationshipStatus = changeRelationshipStatus;
        //TransactionRequestEditAgeOfOnset.prototype.changeRelationshipType = changeRelationshipType;

        return EditAgeOfOnsetTransactionRequest;

        ///

        function create(disorder, reason) {
            // FIXME: I want this to be in the constructor somehow
            var transactionRequest = TransactionRequest.create();
            // Set non-json properties
            //transactionRequest.$$disorder = disorder;
            //transactionRequest.$$gene = gene;
            //transactionRequest.$$disorderGene = disorderGene;
            //transactionRequest.$$reason = reason;
            transactionRequest.setTitle('Edit the Age of Onset for ' + disorder.title);
            transactionRequest.setReason(reason);
            var editAgeOfOnsetTransactionRequest = new EditAgeOfOnsetTransactionRequest(transactionRequest);
            // FIXME: I dont understand why its not inheriting this from its parent
            editAgeOfOnsetTransactionRequest.$$transactions = [];
            return editAgeOfOnsetTransactionRequest;
            //return new TransactionRequestEditAgeOfOnset(transactionRequest);
        }

        ////

        //function changeRelationshipStatus(status) {
        //    this.addChangeTransaction(this.$$disorderGene.nid, 'disgene_as',
        //        this.$$disorderGene['disgene_as'].nid, status.nid);
        //}
        //function changeRelationshipType(type) {
        //    this.addChangeTransaction(this.$$disorderGene.nid, 'disgene_at',
        //        this.$$disorderGene['disgene_at'].nid, type.nid);
        //}

    });
