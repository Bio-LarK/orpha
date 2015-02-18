'use strict';

/**
 * @ngdoc service
 * @name orphaApp.autocompleteService
 * @description
 * # Autocompletes a term given a type
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('autocompleteService', function (ENV, $http) {
        // Service logic
        // ...
        var autocompleteService = {
            autocomplete: autocomplete
        };

        return autocompleteService;

        function autocomplete(type, term) {
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: {
                    'parameters[type]': type,
                    fields: 'nid,title'
                }
            }).then(function(response) {
                return response.data;
            });
        }

    });
