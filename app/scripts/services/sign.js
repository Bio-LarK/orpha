'use strict';

/**
 * @ngdoc service
 * @name orphaApp.sign
 * @description
 * # sign
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Sign', function($resource, $http, ENV, Gene, RelationshipService, Disorder, $log, $q) {
        var Sign = $resource(ENV.apiEndpoint + '/entity_node/:nid', {
            'parameters[type]': 'clinical_sign',
            nid: '@nid'
        });
        Sign.prototype.loadDisorders = loadDisorders;
        Sign.prototype.loadChildren = loadChildren;
        return Sign;

        function loadChildren() {
            /* jshint validthis: true */
            var sign = this;
            var ids = _.pluck(sign['sign_child'], 'nid');
            var params = {};
            _.each(ids, function(id, i) {
                params['parameters[nid][' + i + ']'] = id;
            });
            if(ids.length === 0) {
                sign.sign_child = [];
                return $q.when([]);
            }
            if (ids.length) {
                return Sign.query(params).$promise.then(function(children) {
                    sign.sign_child = children;
                    return children;
                });
            }
            return $q.when([]);
        }

        function loadDisorders() {
            /* jshint validthis: true */
            var sign = this;

            // Find all disorders that pount to this 

            var ids = _.pluck(sign['sign_dissign'], 'nid');
            if(ids.length === 0) {
                sign.disorders = [];
                return $q.when([]);
            }
            if(ids.length > 300) {
                ids = ids.slice(0, 300);
            }
            sign.disorders = [];

            return _loadDisorderSignHelper(sign, ids, 0).then(function(disorderSigns) {
                var disorderIds = [];
                _.each(disorderSigns, function(disorderSign) {
                    disorderIds.push(disorderSign['ds_disorder'].nid);
                });
                return _loadDisordersHelper(sign, disorderIds, 0).then(function(disorders) {
                    sign.disorders = disorders;
                    var classifications = _.pluck(disorders, 'disorder_class');
                    sign.classifications = _.flatten(classifications);
                    return disorders;
                });
            });

            // return $http.get(ENV.apiEndpoint + '/entity_node', {
            //  params: params
            // }).then(function(response) {
            //  var disorderSigns = response.data;
            //  var disorderIds = [];
            //  _.each(disorderSigns, function(disorderSign) {
            //      disorderIds.push(disorderSign['ds_disorder'].nid);
            //  });
            //  var params = {};
            //  _.each(disorderIds, function(disorderId, i) {
            //      params['parameters[nid][' + i + ']'] = disorderId;
            //  });
            //  return Disorder.query(params).$promise.then(function(disorders) {
            //      sign.disorders = disorders;
            //            var classifications = _.pluck(disorders, 'disorder_class');
            //            $log.debug('classifications!', classifications);
            //            sign.classifications = _.flatten(classifications);
            //            $log.debug('lfattened!', sign.classifications);
            //      return disorders;
            //  });
            // });
        }

        function _loadDisorderSignHelper(sign, ids, page) {
            var params = {
                'parameters[type]': 'disorder_sign',
                fields: 'ds_disorder'
            };
            var paginatedIds = ids.slice(page * 20, page * 20 + 20);
            _.each(paginatedIds, function(id, i) {
                params['parameters[nid][' + i + ']'] = id;
            });
            
            return $http.get(ENV.apiEndpoint + '/entity_node', {
                params: params,
                cache: true
            }).then(function(response) {
                var disorderSigns = response.data;
                if (disorderSigns.length === 20) {
                    return _loadDisorderSignHelper(sign, ids, page + 1).then(function(otherDisordersSigns) {
                        return disorderSigns.concat(otherDisordersSigns);
                    });
                }
                return disorderSigns;
            });
        }

        function _loadDisordersHelper(sign, ids, page) {
            var params = {};
            var paginatedIds = ids.slice(page * 20, page * 20 + 20);
            _.each(paginatedIds, function(id, i) {
                params['parameters[nid][' + i + ']'] = id;
            });
            return Disorder.query(params).$promise.then(function(disorders) {
                sign.disorders = sign.disorders.concat(disorders);
                if (disorders.length === 20) {
                    return _loadDisordersHelper(sign, ids, page + 1).then(function(otherDisorders) {
                        return disorders.concat(otherDisorders);
                    });
                }
                return disorders;
            });
        }
    });
