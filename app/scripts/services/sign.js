'use strict';

/**
 * @ngdoc service
 * @name orphaApp.sign
 * @description
 * # sign
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Sign', function ($resource, $http, ENV, Gene, RelationshipService, Disorder, $log, $q) {
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
            $log.debug('stuff', sign, sign['sign_child'], ids);
            if(ids.length) {
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

        	var ids = _.pluck(sign['sign_dissign'], 'nid');
        	var params = {};
        	_.each(ids, function(id, i) {
        		params['parameters[nid][' + i + ']'] = id;
        	});
        	return $http.get(ENV.apiEndpoint + '/entity_node', {
        		params: params
        	}).then(function(response) {
        		var disorderSigns = response.data;
        		var disorderIds = [];
        		_.each(disorderSigns, function(disorderSign) {
        			disorderIds.push(disorderSign['ds_disorder'].nid);
        		});
        		var params = {};
	        	_.each(disorderIds, function(disorderId, i) {
	        		params['parameters[nid][' + i + ']'] = disorderId;
	        	});
        		return Disorder.query(params).$promise.then(function(disorders) {
        			sign.disorders = disorders;
                    var classifications = _.pluck(disorders, 'disorder_class');
                    $log.debug('classifications!', classifications);
                    sign.classifications = _.flatten(classifications);
                    $log.debug('lfattened!', sign.classifications);
        			return disorders;
        		});
        	});
        }
    });