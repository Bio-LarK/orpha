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
    ]).config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/concept/1');
        //
        // Now set up the states
        $stateProvider
            .state('concept', {
                url: '/concept/:conceptId',
                controller: ['$scope', 'Concept', '$timeout',
                    function ($scope, Concept, $timeout) {
                        $scope.concept = Concept.one(3);

                        $timeout(function () {
                            $scope.concept.hpos.unshift({
                                name: 'Rhizomelic shortening',
                                definition: 'Disproportion of the length of the proximal limb, such as the shortened limbs of achondroplasia, or some other disorder of the hip or shoulder',
                                disorderCount: 10
                            });

                            $timeout(function () {
                                $scope.concept.hpos.shift();
                            }, 2000);
                        }, 2000);

                    }
                ],
                templateUrl: 'views/concept.html'
            });
    });