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

                scope.myClassifications = [];

                scope.$watch('classifications', function(classifications) {
                    if(classifications) {
                        scope.myClassifications = classifications;
                        prepData(scope.myClassifications);    
                    }
                    
                });

                scope.$watch('classification', function(classification) {
                    if(classification) {
                        scope.myClassifications = [classification]; 
                        prepData(scope.myClassifications);   
                    }
                });

                function prepData(classifications) {
                    // TODO: make this less disgusting!
                    var highestCount = 0;
                    _.each(classifications, function(classification) {
                        var allClassification = _.find(scope.allClassifications, {name: classification.title});
                        // $log.debug('all classifications found', allClassification, classification);
                        classification.color = allClassification.color;
                        classification.position = scope.allClassifications.indexOf(allClassification);
                        // $log.debug('position', classifications.position);
                        allClassification.isOn = true;
                        allClassification.nid = classification.nid;
                        allClassification.tooltip = '<div style="display:inline-block;margin-right:5px;' + 
                        'width:10px;height:10px;background-color:'+ 
                        allClassification.color + '"></div>' + allClassification.name;
                        if(!allClassification.count) {
                            allClassification.count = 0;
                        }
                        allClassification.count++;
                        // $log.debug('count', allClassification.count);
                        if(allClassification.count > highestCount) {
                            highestCount = allClassification.count;
                        }
                    });
                    _.each(scope.allClassifications, function(allClassification, i) {
                        var hue = 20; //(360/31) * i;
                        var sat = 100;
                        var lightness = 50;
                        // $log.debug('scope.type', scope.type);
                        if(scope.type === 'disorder') {
                            lightness = 70;
                            sat = 70;
                        }
                        if(highestCount > 1) {
                            lightness = 100 - allClassification.count / highestCount * 50;    
                        }
                        allClassification.color = 'hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)';
                    });
                    // $log.debug('all clasisications', scope.allClassifications);
                }

                scope.allClassifications = [{
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
                }, {
                    name: 'Inborn errors of metabolism',
                    color: '#000099'
                }, 
                {
                    name: 'Rare genetic disease',
                    color: '#666699'
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
                }];

                _.each(scope.allClassifications, function(allClassification, i) {
                    var hue = (320/31) * i;
                    var sat = 70;
                    var lightness = 70;
                    allClassification.color = 'hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)';
                });

            }
        };
    });
