'use strict';

/**
 * @ngdoc service
 * @name orphaApp.Comment
 * @description
 * # Comment
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('Comment', function($resource, ENV) {
        var Comment = $resource(ENV.apiEndpoint + '/entity_comment/:cid', {
            cid: '@cid'
        });
        Comment.create = create;
        Comment.getForTransactionRequest = getForTransactionRequest;
        return Comment;

        /////

        function create(text, transactionRequestId) {
            return new Comment({
                node: transactionRequestId,
                subject: text,
                comment_body: {
                    value: text
                }
            });
        }

        function getForTransactionRequest(transactionRequestId) {
            return Comment.query({
                'parameters[node]': transactionRequestId
            }).$promise;
        }
    });
