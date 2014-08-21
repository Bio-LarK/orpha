'use strict';

angular.module('orphaApp')
    .filter('inSlicesOf', ['$rootScope',
        function ($rootScope) {
            console.log('staring in slice of!!');
            var makeSlices = function (items, count) {
                if (!count) {
                    count = 3;
                }

                if (!angular.isArray(items) && !angular.isString(items)) {
                    return items;
                }

                var array = _.groupBy(items, function (val, index) {
                    return Math.floor(index / count);
                });

                $rootScope.arraysinSliceOf = $rootScope.arraysinSliceOf || [];

                var temp = null;
                angular.forEach($rootScope.arraysinSliceOf, function (arrayInSliceOf) {
                    if (angular.equals(arrayInSliceOf, array)) {
                        temp = arrayInSliceOf;
                    }
                });
                if (temp) {
                    return temp;
                }
                $rootScope.arraysinSliceOf.push(array);
                return array;
            };

            return makeSlices;
        }
    ]);