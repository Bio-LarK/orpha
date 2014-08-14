'use strict';

/**
 * @ngdoc service
 * @name orphaApp.RelationshipService
 * @description
 * # RelationshipService
 * Service in the orphaApp.
 */
angular.module('orphaApp')
    .service('RelationshipService', function RelationshipService($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.getRelated = function (resource, intermediaryPropertyName, fields) {
            // get the first property
            var firstIntermediary = _.first(resource[intermediaryPropertyName]);
            var ids = _.pluck(resource[intermediaryPropertyName], 'nid');
            var request = _.indexBy(ids, function (ids, index) {
                return 'parameters[nid][' + index + ']';
            });
            request['paramaters[type]'] = firstIntermediary.type;
            request.fields = ['nid', 'type', 'title'].concat(fields).join(',');

            return $http.get('http://130.56.248.140/orphanet/api/entity_node', {
                params: request
            }).then(function (response) {
                var intermediaries = response.data;
                resource[intermediaryPropertyName] = intermediaries;
            });
        };

        // var relatedIds = _.reduce(list, function (relatedIds, relation) {
        //     relatedIds.push(relation[property].id);
        //     return relatedIds;
        // }, []);


        //     // console.log('Getting ids from ' + property, relatedIds);
        //     var request = _.indexBy(relatedIds, function (relatedId, index) {
        //         return 'parameters[nid][' + index + ']';
        //     });

        //     // return resource.query(request).$promise.then(function (relatedResources) {
        //     //     console.log('related resources', relatedResources);
        //     //     _.forEach(relatedResources, function (relatedResource) {
        //     //         _.forEach(list, function (listItem) {
        //     //             if (listItem[property].id === relatedResource.nid) {
        //     //                 listItem[property] = relatedResource;
        //     //             }
        //     //         });
        //     //     });
        //     // });
        // };
    });