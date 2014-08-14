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
        'ngResource',
        'ui.router',
        'truncate',
        'restangular'
    ]).config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('http://130.56.248.140/orphanet/api');

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/disorder/1');
        //
        // Now set up the states
        $stateProvider
            .state('disorder', {
                url: '/disorder/:disorderId',
                controller: 'DisorderCtrl',
                templateUrl: 'views/disorder.html'
            })
            .state('concept', {
                url: '/concept/:conceptId',
                controller: function ($scope, Disorder) {
                    var disorder = Disorder.get({
                        nid: 136402
                    }, function () {
                        $scope.disorder = disorder;
                    });
                },
                templateUrl: 'views/concept.html'
            });
    });