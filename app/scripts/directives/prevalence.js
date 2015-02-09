'use strict';

/**
 * @ngdoc directive
 * @name orphaApp.directive:prevalence
 * @description
 * # prevalence
 */
angular.module('orphaApp')
    .directive('prevalence', function () {
        return {
            templateUrl: 'views/prevalence.html',
            restrict: 'E',
            scope: {
                prevalence: '='
            },
            link: function postLink(scope, element, attrs) {
            }
        };
    });
