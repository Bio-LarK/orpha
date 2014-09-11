'use strict';

/**
 * @ngdoc service
 * @name orphaApp.modalService
 * @description
 * # modalService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('modalService', function($modal) {
        var service = {
            openPrevalenceClassModal: openPrevalenceClassModal,
            openAgeOfOnset: openAgeOfOnset,
            openAgeOfDeath: openAgeOfDeath
        };
        return service;

        ///////

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
        function openTOI(concept) {
            return openPropertyModal(
                concept, 
                'Type of Inheritance', 
                'disorder_inhertiance', 
                'type_of_inheritance'
            );
        }

        function openPropertyModal(concept, propertyLabel, propertyName, propertyContentType) {
            return $modal.open({
                templateUrl: 'views/edit.modal.html',
                controller: 'EditModalCtrl as editVm',
                resolve: {
                    concept: function() {
                        return concept;
                    },
                    propertyLabel: function() {
                        return propertyLabel;
                    },
                    propertyName: function() {
                        return propertyName;
                    },
                    propertyContentType: function() {
                        return propertyContentType;
                    }
                }
            });
        }
    });
