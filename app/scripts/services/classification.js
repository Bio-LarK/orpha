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

        var colorOptions = [];

        for (var i = 0; i < 31; i++) {
            var hue = (360/31) * i;
            var sat = 60;
            var lightness = 70;
            colorOptions.push('hsla(' + hue + ', ' + sat + '%, ' + lightness + '%, 1)');
        }
        var pointer = 0;

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
                return _.flatten(results);
            });
        }



        function getColor() {
            /* jshint validthis: true */
            var classification = this;
            var id = classification.id || classification.nid;
            if (!colors[id]) {
                // 11.6
                if (pointer < colorOptions.length) {
                    colors[id] = {
                        order: pointer,
                        color: colorOptions[pointer++],
                    };
                } else {
                    colors[id] = '#' + Math.floor(Math.random() * 16777215).toString(16);
                }
            }
            classification.hueIndex = colors[id].order;
            return colors[id].color;
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
