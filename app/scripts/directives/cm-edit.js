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
            //template: '<div ng-transclude></div>',
            restrict: 'A',
            //transclude: true,
            scope: {
                editing: '=',
                click: '&',
                border: '@?'
            },
            //replace: true,
            link: function postLink($scope, element, attrs) {

                $scope.$watch('editing', editingStateChanged);

                function editingStateChanged(isEditing) {
                    if(isEditing) {
                        if($scope.border == 'bottom') {
                            element.addClass('editable');
                        } else {
                            element.addClass('editable-card');
                        }

                        element.click(editClickHandler);
                        disableInternalLinks(element);
                        return;
                    }
                    if($scope.border == 'bottom') {
                        element.removeClass('editable');
                    } else {
                        element.removeClass('editable-card');
                    }
                    element.unbind('click', editClickHandler);
                    enableInternalLinks(element);
                }

                /**
                 * Call the passed in click method, cause we are editing :)
                 */
                function editClickHandler() {
                    $scope.click();
                }

                /**
                 * Disable internal links while we are editing
                 * @param element
                 */
                function disableInternalLinks(element) {
                    element.find('a').click(disableClickHandler);
                }

                /**
                 * Handle anchors being clicked, while disabled
                 * @param event
                 */
                function disableClickHandler(event) {
                    event.preventDefault();
                }

                /**
                 * Removes any disabling click handlers
                 * @param element
                 */
                function enableInternalLinks(element) {
                    element.find('a').unbind('click', disableClickHandler);
                }

            }
        };
    });
