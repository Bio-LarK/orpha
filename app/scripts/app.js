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
        'ngCookies',
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
        'toaster',
        'monospaced.elastic',
        'textAngular',
        'duScroll',
        'sf.treeRepeat',
        'ui.select',
        'ui.tree'
    ])
    .run(function($rootScope, $http, $state, $stateParams,
        editableOptions, Page, ENV, siteSearchService, $log, authService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.Page = Page;
        $rootScope.authService = authService;
        editableOptions.theme = 'bs3';

        $rootScope.siteSearchService = siteSearchService;


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {            
            if(!authService.isLoginRequiredToState(toState)) {
                // Check if the session is valid just for fun
                // just so its set up for other requiests
                authService.isSessionValid();
                return;
            }
            event.preventDefault();
            authService.isSessionValid().then(function(isValid) {
                if(isValid) {
                    return $state.go(toState.name, toParams);
                }
                authService.openLoginModal().then(function() {
                    return $state.go(toState.name, toParams);
                }, function() {
                    if(!fromState.name) {
                        return $state.go('home');
                    }
                    return $state.go(fromState.name, fromParams);
                });
            });
        });
    })
    .config(function($stateProvider, $animateProvider, uiSelectConfig, $urlRouterProvider, RestangularProvider, ENV) {

        RestangularProvider.setBaseUrl(ENV.apiEndpoint);

        uiSelectConfig.theme = 'bootstrap';

        $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/landing');

        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/landing',
                controller: 'HomeCtrl as vm',
                templateUrl: 'views/home.html'
            })
            .state('user', {
                abstract: true,
                url: '/users/:userId',
                template: '<ui-view/>'
            })
            .state('user.show', {
                url: '',
                controller: 'UserCtrl',
                controllerAs: 'vm',
                data: {
                    // TODO: remove this
                    // this is there currently since user.show is only showing
                    // the logged in users profile page
                    // in the future, when users can register, this will be removed
                    requireLogin: true 
                },
                templateUrl: 'views/user.show.html'
            }) 
            .state('user.edit', {
                url: '/edit',
                template: '<h1>Edit</h1>',
                data: {
                    requireLogin: true
                }
            })
            .state('classification', {
                url: '/classification/:classificationId?disorderId',
                controller: 'ClassificationCtrl as vm',
                templateUrl: 'views/classification.html'
            })
            .state('landing', {
                url: '/landing',
                templateUrl: 'views/landing.html'
            })
            .state('tour', {
                url: '/tour',
                controller: ['Page', function(Page) {
                    Page.setTitle('Tour');
                }],
                templateUrl: 'views/tour.html'
            })
            .state('gene', {
                url: '/gene/:geneId/disorders',
                controller: 'GeneCtrl',
                templateUrl: 'views/gene.html'
            })
            .state('genes', {
                url: '/genes',
                controller: 'GenesCtrl',
                templateUrl: 'views/genes.html'
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
            // .state('suggestions', {
            //     url: '/suggestions',
            //     abstract: true,
            //     template: '<ui-view/>',
            //     data: {
            //         requireLogin: true
            //     }
            // })
            .state('suggestions', {
                url: '/suggestions/index',
                controller: 'SuggestionsCtrl as vm',
                templateUrl: 'views/suggestions.html',
                data: {
                    requireLogin: true
                }
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
                controller: 'DisordersCtrl as vm',
                templateUrl: 'views/disorders.html'
            })
            .state('editclassification', {
                url: '/classification/:classificationId/edit?disorderId',
                controller: 'EditClassificationCtrl as vm',
                templateUrl: 'views/editclassification.html',
                data: {
                    requireLogin: true
                }
            })
            .state('concept', {
                url: '/concept/:conceptId',
                controller: function($scope, Disorder) {
                    var disorder = Disorder.get({
                        nid: 136402
                    }, function() {
                        $scope.disorder = disorder;
                    });
                },
                templateUrl: 'views/concept.html'
            });
    });
