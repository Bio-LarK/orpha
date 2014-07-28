'use strict';

/**
 * @ngdoc overview
 * @name orphaApp
 * @description
 * # orphaApp
 *
 * Main module of the application.
 */
angular
    .module('orphaApp', [
        'ngAnimate',
        'ngSanitize',
        'ui.router'
    ]).config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/concept/1');
        //
        // Now set up the states
        $stateProvider
            .state('concept', {
                url: '/concept/:conceptId',
                controller: function() {
                    console.log('concept controller is running');
                },
                templateUrl: 'views/concept.html'
            });
    });
