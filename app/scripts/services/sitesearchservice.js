'use strict';

/**
 * @ngdoc service
 * @name orphaApp.siteSearchService
 * @description
 * # siteSearchService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('siteSearchService', function(searchService, $state, $log, $rootScope) {
        var service = {
            query: '',
            getResults: getResults,
            changed: changed
        };        
        $rootScope.$on('$stateChangeSuccess', 
            function(event, toState, toParams, fromState, fromParams) { 
                service.query = '';
            }
        );
        return service;

        function getResults(query) {
            return searchService.search(query);
        }

        function changed($item, $model, $label) {
            var params = {};
            var type = $item.type.toLowerCase();
            if (type === 'clinical sign') {
                type = 'sign';
            }
            params[type + 'Id'] = $item.node;
            $state.go(type, params);
        }

    });
