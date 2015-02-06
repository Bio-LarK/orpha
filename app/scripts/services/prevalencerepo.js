'use strict';

/**
 * @ngdoc service
 * @name orphaApp.prevalenceRepo
 * @description
 * # prevalenceRepo
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('prevalenceRepo', function ($http, ENV, $q) {

        var prevalenceRepo = {
            getSome: getPrevalences,
            get: getPrevalence
        };

        return prevalenceRepo;

        ////

        function getPrevalence(prevalenceId) {
            return $http.get(ENV.apiEndpoint + '/entity_node/' + prevalenceId).then(function(response) {
                return response.data;
            });
        }

        function getPrevalences(prevalenceIds) {
            var prevalencePromises = _.map(prevalenceIds, function (prevalenceId) {
                return getPrevalence(prevalenceId)
            });
            return $q.all(prevalencePromises);
        }

    });
