'use strict';

/**
 * @ngdoc service
 * @name orphaApp.GroupByService
 * @description
 * # GroupByService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('GroupByService', function () {
        var arrays = [];
        var groupBy = {
            groupBy: groupBy
        };
        return groupBy;

        /////////////////

        function groupBy(array, count) {
            var array = _.groupBy(items, function (val, index) {
                return Math.floor(index / count);
            });
        }
    });