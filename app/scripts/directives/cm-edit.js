'use strict';

/**
 * @ngdoc directive
 * @name orphaApp.directive:cmEdit
 * @description
 * # cmEdit
 */
angular.module('orphaApp')
    .directive('cmEdit', function () {
        return {
            template: '<div ng-click="editing && click()"><div ng-transclude></div></div>',
            restrict: 'E',
            transclude: true,
            scope: {
                editing: '=',
                click: '&'
            },
            replace: true,
            link: function postLink($scope, element, attrs) {
                $scope.$watch('editing', function(isEditing) {
                    if(isEditing) {
                        element.addClass('editable');
                    } else {
                        element.removeClass('editable');
                    }
                });
            }
        };
    });
