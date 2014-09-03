'use strict';

/**
 * @ngdoc service
 * @name orphaApp.ListTransaction
 * @description
 * # ListTransaction
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
  .factory('ListTransaction', function ($resource, ENV) {
        var ListTransaction = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'list_transaction',
            nid: '@nid'
        });

        return ListTransaction;
    });
