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

        var classificationMetadata = [
            {
                name: 'Rare neurologic disease',
                count: '2435',
                color: '#ff0000'
            },
            {
                name: 'Rare allergic disease',
                count: '37',
                color: '#990000'
            },
            {
                name: 'Rare circulatory system disease',
                count: '177',
                color: '#663333'
            },
            {
                name: 'Rare hematologic disease',
                count: '528',
                color: '#cc6666'
            },
            {
                name: 'Rare skin disease',
                count: '994',
                color: '#ff9999'
            },
            {
                name: 'Rare renal disease',
                count: '463',
                color: '#ff99ff'
            },
            {
                name: 'Rare odontologic disease',
                count: '122',
                color: '#993399'
            },
            {
                name: 'Rare infectious disease',
                count: '196',
                color: '#ff00ff'
            },
            {
                name: 'Rare gastroenterologic disease',
                count: '175',
                color: '#660066'
            },
            {
                name: 'Rare cardiac disease',
                count: '204',
                color: '#9900ff'
            },
            {
                name: 'Rare gynecologic or obstetric disease',
                count: '290',
                color: '#cc99ff'
            },
            {
                name: 'Rare abdominal surgical disease',
                count: '187',
                color: '#0000ff'
            },
            {
                name: 'Inborn errors of metabolism',
                count: '950',
                color: '#000099'
            },
            {
                name: 'Rare genetic disease',
                count: '6114',
                color: '#666699'
            },
            {
                name: 'Rare hepatic disease',
                count: '138',
                color: '#ccccff'
            },
            {
                name: 'Rare surgical cardiac disease',
                count: '217',
                color: '#99ccff'
            },
            {
                name: 'Rare maxillo-facial surgical disease',
                count: '235',
                color: '#3399ff'
            },
            {
                name: 'Rare developmental defect during embryogenesis',
                count: '3269',
                color: '#336666'
            },
            {
                name: 'Rare immune disease',
                count: '234',
                color: '#669999'
            },
            {
                name: 'Rare teratologic disease',
                count: '36',
                color: '#00ffff'
            },
            {
                name: 'Rare systemic or rheumatologic disease',
                count: '222',
                color: '#006666'
            },
            {
                name: 'Rare neoplastic disease',
                count: '896',
                color: '#006633'
            },
            {
                name: 'Rare urogenital disease',
                count: '194',
                color: '#00cc66'
            },
            {
                name: 'Rare infertility',
                count: '166',
                color: '#33ff99'
            },
            {
                name: 'Rare otorhinolaryngologic disease',
                count: '438',
                color: '#339933'
            },
            {
                name: 'Rare intoxication',
                count: '25',
                color: '#666633'
            },
            {
                name: 'Rare surgical thoracic disease',
                count: '65',
                color: '#cccc99'
            },
            {
                name: 'Rare endocrine disease',
                count: '627',
                color: '#ffff33'
            },
            {
                name: 'Rare respiratory disease',
                count: '256',
                color: '#ffcc00'
            },
            {
                name: 'Rare eye disease',
                count: '976',
                color: '#996600'
            },
            {
                name: 'Rare bone disease',
                count: '977',
                color: '#999933'
            }
        ];

        _.each(classificationMetadata, function(classificationData, i) {
            var hue = (360/31) * i;
            var sat = 80;
            var lightness = 70;
            classificationData.color = 'hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)';
        });

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
                    var metadata = _.find(classificationMetadata, {name: classification.title});
                    classification.disorderCount = metadata.count;
                    classification.color = metadata.color;
                });
                return classifications;
            });
        }

        function getColor() {
            // jshint validthis: true 
            var classification = this;
            var metadata = _.find(classificationMetadata, {name: classification.title});
            return metadata.color;
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
