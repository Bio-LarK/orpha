'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .factory('TransactionRequestEditGene', function(TransactionRequest) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var TransactionRequestEditGene = function(data) {
            TransactionRequest.call(this, data);
        };
        TransactionRequestEditGene.create = create;
        TransactionRequestEditGene.prototype = TransactionRequest.prototype;
        TransactionRequestEditGene.prototype.constructor = TransactionRequestEditGene;
        TransactionRequestEditGene.prototype.changeRelationshipStatus = changeRelationshipStatus;
        TransactionRequestEditGene.prototype.changeRelationshipType = changeRelationshipType;

        ////

        function create(disorder, gene, disorderGene, reason) {
            // FIXME: I want this to be in the constructor somehow
            var transactionRequest = TransactionRequest.create();
            // Set non-json properties
            transactionRequest.$$disorder = disorder;
            transactionRequest.$$gene = gene;
            transactionRequest.$$disorderGene = disorderGene;
            transactionRequest.$$reason = reason;
            transactionRequest.setTitle('Edit Relationship between ' + disorder.title + ' and ' + gene.title);
            transactionRequest.setReason(reason);
            return new TransactionRequestEditGene(transactionRequest);
        }

        ////

        function changeRelationshipStatus(status) {
            this.addChangeTransaction(this.$$disorderGene.nid, 'disgene_as',
                this.$$disorderGene['disgene_as'].nid, status.nid);
        }
        function changeRelationshipType(type) {
            this.addChangeTransaction(this.$$disorderGene.nid, 'disgene_at',
                this.$$disorderGene['disgene_at'].nid, type.nid);
        }
        return TransactionRequestEditGene;
    });
