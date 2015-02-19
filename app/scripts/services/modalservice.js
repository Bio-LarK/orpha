'use strict';

/**
 * @ngdoc service
 * @name orphaApp.modalService
 * @description
 * # modalService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('modalService', function($modal, searchService) {
        var service = {
            openPrevalenceClassModal: openPrevalenceClassModal,
            openAgeOfOnset: openAgeOfOnset,
            openAgeOfDeath: openAgeOfDeath,
            openDisorderType: openDisorderType,
            openTypeOfInheritance: openTypeOfInheritance,
            openEditTitle: openEditTitle,
            openEditDescription: openEditDescription,
            openEditClassification: openEditClassification,
            openEditClassificationAddChild: openEditClassificationAddChild,
            openEditClassificationRemoveDisorder: openEditClassificationRemoveDisorder
        };
        return service;

        ///////

        function openEditClassificationRemoveDisorder(classification, disorder, parent) {
            var config = {
                disorder: disorder,
                parent: parent
            };
            return $modal.open({
                templateUrl: 'views/modals/edit-classification-remove.html',
                controller: 'ModalsRemoveDisorderFromClassificationCtrl as vm',
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
        }

        function openEditClassification(classification, disorder, parent, newParent) {
            return $modal.open({
                templateUrl: 'views/modals/edit-classification.html',
                controller: 'ModalEditClassificationCtrl as vm',
                resolve: {
                    config: function() {
                        return {
                            classification: classification,
                            disorder: disorder,
                            parent: parent,
                            newParent: newParent
                        };
                    }
                }
            });
        }

        function openEditClassificationAddChild(classification, parent) {
            var config = {
                classification: classification,
                disorder: parent
            };
            return $modal.open({
                templateUrl: 'views/modals/edit-classification-add-child.html',
                controller: 'ModalsAddDisorderToClassificationCtrl as vm',
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
        }

        function openEditClassificationRemove(classification, disorder, parent) {
            var config = {
                classification: classification,
                disorder: parent
            };
            return $modal.open({
                templateUrl: 'views/modals/edit-classification-remove.html',
                controller: 'ModalsRemoveDisorderToClassificationCtrl as vm',
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
        }

        function openEditTitle(concept) {
            var config = {
                concept: concept,
                propertyName: 'title',
                propertyLabel: 'Disorder Name'
            };

            return $modal.open({
                templateUrl: 'views/edittitle.modal.html',
                controller: 'EditTitleCtrl as vm',
                resolve: {
                    config: function() {
                        return config;
                    }

                }
            });
        }

        function openEditDescription(concept) {
            var config = {
                concept: concept,
                propertyName: 'body',
                propertyLabel: 'Description'
            };

            return $modal.open({
                templateUrl: 'views/editbody.modal.html',
                controller: 'EditTitleCtrl as vm',
                resolve: {
                    config: function() {
                        return config;
                    }

                }
            });
        }


        function openPrevalenceClassModal(concept) {
            return openPropertyModal(
                concept,
                'Prevalence Class',
                'disorder_prevalence',
                'prevalence_class'
            );
        }

        function openAgeOfOnset(concept) {
            return openPropertyModal(
                concept,
                'Age of Onset',
                'disorder_onset',
                'age_of_onset'
            );
        }

        function openAgeOfDeath(concept) {
            return openPropertyModal(
                concept,
                'Age of Death',
                'disorder_death',
                'age_of_death'
            );
        }

        function openTypeOfInheritance(concept) {
            return openPropertyModal(
                concept,
                'Type of Inheritance',
                'disorder_inheritance',
                'type_of_inheritance'
            );
        }

        function openDisorderType(concept) {
            return openPropertyModal(
                concept,
                'Disorder Type',
                'disorder_distype',
                'disorder_type'
            );
        }


        function openPropertyModal(concept, propertyLabel, propertyName, propertyContentType) {
            var config = {
                concept: concept,
                propertyLabel: propertyLabel,
                propertyName: propertyName,
                propertyContentType: propertyContentType
            };
            return $modal.open({
                templateUrl: 'views/disorder/modals/edit-properties.html',
                controller: 'EditModalCtrl as editVm',
                resolve: {
                    config: function() {
                        return config;
                    }

                }
            });
        }
    });
