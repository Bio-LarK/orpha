'use strict';

/**
 * @ngdoc service
 * @name orphaApp.Classification
 * @description
 * # Classification
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Classification', function($resource, $q, ENV, $log) {
        var colors = {};

        var classificationMetadata = {
            'Rare neurologic disease': {
                count: '2435',
                color: '#ff0000'
            },
            'Rare allergic disease': {
                count: '37',
                color: '#990000'
            },
            'Rare circulatory system disease': {
                count: '177',
                color: '#663333'
            },
            'Rare hematologic disease': {
                count: '528',
                color: '#cc6666'
            },
            'Rare skin disease': {
                count: '994',
                color: '#ff9999'
            },
            'Rare renal disease': {
                count: '463',
                color: '#ff99ff'
            },
            'Rare odontologic disease': {
                count: '122',
                color: '#993399'
            },
            'Rare infectious disease': {
                count: '196',
                color: '#ff00ff'
            },
            'Rare gastroenterologic disease': {
                count: '175',
                color: '#660066'
            },
            'Rare cardiac disease': {
                count: '204',
                color: '#9900ff'
            },
            'Rare gynecologic or obstetric disease': {
                count: '290',
                color: '#cc99ff'
            },
            'Rare abdominal surgical disease': {
                count: '187',
                color: '#0000ff'
            },
            'Inborn errors of metabolism': {
                count: '950',
                color: '#000099'
            },
            'Rare genetic disease': {
                count: '6114',
                color: '#666699'
            },
            'Rare hepatic disease': {
                count: '138',
                color: '#ccccff'
            },
            'Rare surgical cardiac disease': {
                count: '217',
                color: '#99ccff'
            },
            'Rare maxillo-facial surgical disease': {
                count: '235',
                color: '#3399ff'
            },
            'Rare developmental defect during embryogenesis': {
                count: '3269',
                color: '#336666'
            },
            'Rare immune disease': {
                count: '234',
                color: '#669999'
            },
            'Rare teratologic disease': {
                count: '36',
                color: '#00ffff'
            },
            'Rare systemic or rheumatologic disease': {
                count: '222',
                color: '#006666'
            },
            'Rare neoplastic disease': {
                count: '896',
                color: '#006633'
            },
            'Rare urogenital disease': {
                count: '194',
                color: '#00cc66'
            },
            'Rare infertility': {
                count: '166',
                color: '#33ff99'
            },
            'Rare otorhinolaryngologic disease': {
                count: '438',
                color: '#339933'
            },
            'Rare intoxication': {
                count: '25',
                color: '#666633'
            },
            'Rare surgical thoracic disease': {
                count: '65',
                color: '#cccc99'
            },
            'Rare endocrine disease': {
                count: '627',
                color: '#ffff33'
            },
            'Rare respiratory disease': {
                count: '256',
                color: '#ffcc00'
            },
            'Rare eye disease': {
                count: '976',
                color: '#996600'
            },
            'Rare bone disease': {
                count: '977',
                color: '#999933'
            }
        };
            
        //     '#ff9900',
        //     '#cc9966',
        //     '#663300',
        //     '#333333',
        //     '#999999,',
        // ];

        // colorOptions = [];
        // for (var i = 0; i < 31; i++) {
        //     var hue = (360/31) * i;
        //     var sat = 80;
        //     var lightness = 70;
        //     colorOptions.push('hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)');
        // }
        // var pointer = 0;

        var Classification = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'disorder_classification',
            nid: '@nid'
        });
        Classification.getAll = getAll;
        Classification.prototype.getColor = getColor;
        return Classification;

        function getAll() {
            return $q.all([Classification.query({
                page: 0
            }).$promise, Classification.query({
                page: 1
            }).$promise]).then(function(results) {
                var classifications = _.flatten(results);
                _.each(classifications, function(classification) {
                    classification.disorderCount = classificationMetadata[classification.title].count;
                    classification.color = classificationMetadata[classification.title].color;
                });
                return classifications;
            });
        }

        function getColor() {
            // jshint validthis: true 
            var classification = this;
            // var id = classification.id || classification.nid;
            // if (!colors[id]) {
            //     // 11.6
            //     if (pointer < colorOptions.length) {
            //         colors[id] = {
            //             order: pointer,
            //             color: colorOptions[pointer++],
            //         };
            //     } else {
            //         colors[id] = '#' + Math.floor(Math.random() * 16777215).toString(16);
            //     }
            // }
            // classification.hueIndex = colors[id].order;
            return classificationMetadata[classification.title].color;
        }

        // function hslToRgb(h, s, l) {
        //     var r, g, b;

        //     if (s == 0) {
        //         r = g = b = l; // achromatic
        //     } else {
        //         function hue2rgb(p, q, t) {
        //             if (t < 0) t += 1;
        //             if (t > 1) t -= 1;
        //             if (t < 1 / 6) return p + (q - p) * 6 * t;
        //             if (t < 1 / 2) return q;
        //             if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        //             return p;
        //         }

        //         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        //         var p = 2 * l - q;
        //         r = hue2rgb(p, q, h + 1 / 3);
        //         g = hue2rgb(p, q, h);
        //         b = hue2rgb(p, q, h - 1 / 3);
        //     }

        //     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        // }

    });
