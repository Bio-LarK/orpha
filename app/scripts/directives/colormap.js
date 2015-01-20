'use strict';

/**
 * @ngdoc directive
 * @name orphaApp.directive:colormap
 * @description
 * # colormap
 */
angular.module('orphaApp')
    .directive('colormap', function($log) {
        return {
            templateUrl: 'views/colormap.html',
            restrict: 'E',
            scope: {
                classifications: '=',
                classification: '=',
                type: '@'
            },
            link: function postLink(scope, element, attrs) {

                setupColors();

                // scope.myClassifications = [];
                scope.highestCount = 0;

                scope.$watch('classifications', function(classifications) {
                    if(classifications) {
                        prepData(classifications);
                    }
                    
                });
                scope.$watch('classification', function(classification) {
                    if(classification) {
                        prepData([classification]);
                    }
                });


                function prepData(activeClassifications) {
                    // $log.debug('Generating for type', scope.type);
                    if(isDisorder(scope.type)) {
                        scope.myClassifications = prepDataForDisorders(activeClassifications);
                        return;
                    }
                    if(isGene(scope.type) || isSign(scope.type) || isOther()) {
                        scope.myClassifications = prepDataForGeneOrSign(activeClassifications);
                    }
                }

                function isDisorder(type) {
                    return !type || type === '' || type === 'disorder';
                }

                function isGene(type) {
                    return type === 'gene';
                }
                function isSign(type) {
                    return type === 'sign';
                }
                function isOther() {
                    return true;
                }

                function prepDataForGeneOrSign(activeClassifications) {
                    var allClassifications = angular.copy(scope.allClassifications);
                    _.each(allClassifications, function (classification) {
                        getClassificationAppearanceCount(classification, activeClassifications);
                    });

                    // setup properties
                    _.each(allClassifications, function (classification) {
                        addGeneSignDisplayData(classification, activeClassifications);
                    });
                    return allClassifications;
                }

                /**
                 * Counts how many times a classification appears in the active
                 * classification list (list has duplicates)
                 * @param classification
                 * @param activeClassifications
                 */
                function getClassificationAppearanceCount(classification, activeClassifications) {
                    classification.count = _.filter(activeClassifications, {title: classification.name}).length;
                    if(classification.count > scope.highestCount) {
                        scope.highestCount = classification.count;
                    }
                }

                function prepDataForDisorders(activeClassifications) {
                    _.each(activeClassifications, function (classification) {
                        addDisorderDisplayData(classification, activeClassifications);
                    });
                    return activeClassifications;
                }

                function addDisorderDisplayData(classification, classifications) {
                    classification.color = getColorForClassificationName(classification.title);
                    classification.tooltip =
                        getTooltipForClassificationName(classification.title, 100 / classifications.length);
                    classification.position = getPositionForClassificationName(classification.title);
                }


                function addGeneSignDisplayData(classification, activeClassifications) {
                    _.extend(classification, _.find(activeClassifications, {title: classification.name}));
                    //$log.debug('classification', classification);
                    classification.tooltip = getTooltipForClassificationName(classification.name);
                    classification.isOn = true;
                    var hue = getHueForType(scope.type);
                    var sat = 100;
                    var lightness = getLightnessForCountMax(classification.count, scope.highestCount);
                    classification.color = 'hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)';
                }

                function getHueForType(type) {
                    if(type === 'sign') {
                        return 20; // orange
                    }
                    if(type === 'gene') {
                        return 200; // blue
                    }
                    $log.error('No hue found');
                    // default
                    return 300;
                }
                function getLightnessForCountMax(count, maxCount) {
                    return 100 - count / maxCount * 50;
                }

                function getTooltipForClassificationName(name, percentage) {
                    var tooltip = '<div style="display:inline-block;margin-right:5px;' + 
                        'width:10px;height:10px;background-color:'+ 
                        getColorForClassificationName(name) + '"></div>' + name;
                    if(percentage) {
                        tooltip += ' ' + percentage + '%';
                    }
                    return tooltip;
                }

                function getColorForClassificationName(name) {
                    var classification = _.find(scope.allClassifications, {name: name});
                    if(!classification) {
                        $log.error('No classification found for:', name);
                        return '#eeeeee';
                    }
                    return classification.color;
                }

                function getPositionForClassificationName(name) {
                    var classification = _.find(scope.allClassifications, {name: name});
                    if(!classification) {
                        $log.error('Couldn\'t get position. No classification found for:', name);
                        return 0;
                    }
                    return scope.allClassifications.indexOf(classification);
                }

                function setupColors() {
                    scope.allClassifications = [
                    {
                        name: 'Rare genetic disease',
                        color: '#666699'
                    },
                    {
                        name: 'Rare neurologic disease',
                        color: '#ff0000'
                    }, {
                        name: 'Rare allergic disease',
                        color: '#990000'
                    }, {
                        name: 'Rare cardiac disease',
                        color: '#9900ff'
                    }, {
                        name: 'Rare surgical cardiac disease',
                        color: '#99ccff'
                    }, {
                        name: 'Rare circulatory system disease',
                        color: '#663333'
                    }, {
                        name: 'Rare hematologic disease',
                        color: '#cc6666'
                    }, {
                        name: 'Rare skin disease',
                        color: '#ff9999'
                    }, {
                        name: 'Rare renal disease',
                        color: '#ff99ff'
                    }, {
                        name: 'Rare odontologic disease',
                        color: '#993399'
                    }, {
                        name: 'Rare infectious disease',
                        color: '#ff00ff'
                    }, {
                        name: 'Rare gastroenterologic disease',
                        color: '#660066'
                    }, {
                        name: 'Rare gynecologic or obstetric disease',
                        color: '#cc99ff'
                    }, {
                        name: 'Rare abdominal surgical disease',
                        color: '#0000ff'
                    }, 
                    {
                        name: 'Rare hepatic disease',
                        color: '#ccccff'
                    }, {
                        name: 'Rare maxillo-facial surgical disease',
                        color: '#3399ff'
                    }, {
                        name: 'Rare developmental defect during embryogenesis',
                        color: '#336666'
                    }, {
                        name: 'Rare immune disease',
                        color: '#669999'
                    }, {
                        name: 'Rare teratologic disease',
                        color: '#00ffff'
                    }, {
                        name: 'Rare systemic or rheumatologic disease',
                        color: '#006666'
                    }, {
                        name: 'Rare neoplastic disease',
                        color: '#006633'
                    }, {
                        name: 'Rare urogenital disease',
                        color: '#00cc66'
                    }, {
                        name: 'Rare infertility',
                        color: '#33ff99'
                    }, {
                        name: 'Rare otorhinolaryngologic disease',
                        color: '#339933'
                    }, {
                        name: 'Rare intoxication',
                        color: '#666633'
                    }, {
                        name: 'Rare surgical thoracic disease',
                        color: '#cccc99'
                    }, {
                        name: 'Rare endocrine disease',
                        color: '#ffff33'
                    }, {
                        name: 'Rare respiratory disease',
                        color: '#ffcc00'
                    }, {
                        name: 'Rare eye disease',
                        color: '#996600'
                    }, {
                        name: 'Rare bone disease',
                        color: '#999933'
                    }, {
                        name: 'Unknown',
                        color: '#eee'
                    }, {
                        name: 'Inborn errors of metabolism',
                        color: '#000099'
                    }];

                    _.each(scope.allClassifications, function(allClassification, i) {
                        var hue = (320/31) * i;
                        var sat = 70;
                        var lightness = 70;
                        allClassification.color = 'hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)';
                    });
                }

            }
        };
    });
