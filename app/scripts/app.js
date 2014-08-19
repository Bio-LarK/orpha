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
        'restangular',
        'ui.bootstrap',
        'dotjem.angular.tree'
    ])
    .run(function ($rootScope, $http, $state) {
        $rootScope.getResults = function (text) {
            var keys = encodeURIComponent(text);
            var url = 'http://130.56.248.140/orphanet/api/search_node/retrieve.json?keys=' + keys + '&simple=1';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };
        $rootScope.changed = function ($item, $model, $label) {
            console.log($item, $model, $label);
            var params = {};
            params[$item.type.toLowerCase() + 'Id'] = $item.node;
            $state.go($item.type.toLowerCase(), params);
            console.log($item.type.toLowerCase(), params);
        };
    })
    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('http://130.56.248.140/orphanet/api');

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/disorders');
        //
        // Now set up the states
        $stateProvider
            .state('genes', {
                url: '/genes?page',
                controller: 'GenesCtrl',
                templateUrl: 'views/genes.html'
            })
            .state('gene', {
                url: '/gene/:geneId',
                controller: 'GeneCtrl',
                templateUrl: 'views/gene.html'
            })
            .state('sign', {
                url: '/sign/:signId/disorders',
                controller: 'SignCtrl',
                templateUrl: 'views/sign.html'
            })
            .state('disorder', {
                url: '/disorders/:disorderId',
                controller: 'DisorderCtrl',
                templateUrl: 'views/disorder.html'
            })
            .state('disorders', {
                url: '/disorders?page?signId',
                controller: 'DisordersCtrl',
                templateUrl: 'views/disorders.html'
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