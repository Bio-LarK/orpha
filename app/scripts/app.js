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
        'dotjem.angular.tree',
        'ui.utils',
        'ajoslin.promise-tracker',
        'angular-loading-bar',
        'xeditable',
        'config',
        'toaster'
    ])
    .run(function ($rootScope, $http, $state, $stateParams, editableOptions, Page) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.Page = Page;
        editableOptions.theme = 'bs3';

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
            var type = $item.type.toLowerCase();
            if (type === 'clinical sign') {
                type = 'sign';
            }
            params[type + 'Id'] = $item.node;
            $state.go(type, params);
            console.log(type, params);
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
                url: '/gene/:geneId/disorders',
                controller: 'GeneCtrl',
                templateUrl: 'views/gene.html'
            })
            .state('sign', {
                url: '/sign/:signId/disorders',
                controller: 'SignCtrl',
                templateUrl: 'views/sign.html'
            })
            .state('signs', {
                url: '/signs',
                controller: 'SignsCtrl',
                templateUrl: 'views/signs.html'
            })
            .state('suggestions', {
                url: '/suggestions',
                controller: 'SuggestionsCtrl as vm',
                templateUrl: 'views/suggestions.html',
            })
            .state('suggestion', {
                url: '/suggestions/:suggestionId',
                controller: 'SuggestionCtrl as vm',
                templateUrl: 'views/suggestion.html',
            })
            .state('disorder', {
                url: '/disorders/:disorderId',
                controller: 'DisorderCtrl',
                templateUrl: 'views/disorder.html',
            })
            .state('disorder.edit', {
                url: '/edit'
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