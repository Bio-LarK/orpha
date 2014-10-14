'use strict';

/**
 * @ngdoc service
 * @name orphaApp.Classification
 * @description
 * # Classification
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
  .factory('Classification', function($resource, $q, ENV) {
        var colors = {};

        var Classification = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'disorder_classification',
            nid: '@nid'
        });
        Classification.getAll = getAll;
        Classification.prototype.getColor = getColor;
        return Classification;

        function getAll() {

        	return $q.all([Classification.query({
                page: 0
            }).$promise, Classification.query({
                page: 1
            }).$promise]).then(function(results) {
                return _.flatten(results);
            });
        }



        function getColor() {
            /* jshint validthis: true */
            var classification = this;
            var id = classification.id || classification.nid;
            if(!colors[id]) {
                colors[id] = '#'+Math.floor(Math.random()*16777215).toString(16); 
            }
            return colors[id];
        }
    });
