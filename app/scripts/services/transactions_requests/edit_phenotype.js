'use strict';

/**
 * @ngdoc service
 * @name orphaApp.transactionRequestRemovePhenotype
 * @description
 * # transactionRequestRemovePhenotype
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .factory('TransactionRequestEditDisorderPhenotype', function(TransactionRequest) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var TREditDisorderPhenotype = function(data) {
            TransactionRequest.call(this, data);
        };
        TREditDisorderPhenotype.create = create;
        TREditDisorderPhenotype.prototype = TransactionRequest.prototype;
        TREditDisorderPhenotype.prototype.constructor = TREditDisorderPhenotype;
        TREditDisorderPhenotype.prototype.changeFrequency = changeFrequency;

        ////

        function create(disorder, phenotype, disorderPhenotype, reason) {
            // FIXME: I want this to be in the constructor somehow
            var transactionRequest = TransactionRequest.create();
            // Set non-json properties
            transactionRequest.$$disorder = disorder;
            transactionRequest.$$phenotype = phenotype;
            transactionRequest.$$disorderPhenotype = disorderPhenotype;
            transactionRequest.$$reason = reason;
            transactionRequest.setTitle('Edit Relationship between ' + disorder.title + ' and ' + gene.title);
            transactionRequest.setReason(reason);
            return new TREditDisorderPhenotype(transactionRequest);
        }

        ////

        function changeFrequency(frequency) {
            this.addChangeTransaction(this.$$disorderPhenotype.nid, 'ds_frequency',
                this.$$disorderPhenotype['ds_frequency'].nid, frequency.nid);
        }
        return TREditDisorderPhenotype;
    });
