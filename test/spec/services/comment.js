'use strict';

describe('Service: Comment', function() {

    // load the service's module
    beforeEach(function() {
        // Load the controller's module
        module('orphaApp');
        module('authServiceMock');
    });

    // instantiate service
    var Comment, $httpBackend, ENV, $rootScope;
    beforeEach(inject(function(_Comment_, _$httpBackend_, _ENV_, _$rootScope_) {
        Comment = _Comment_;
        $httpBackend = _$httpBackend_;
        ENV = _ENV_;
        $rootScope = _$rootScope_;

        $httpBackend.whenGET(/views.*/).respond(200, '');
    }));

    it('should do something', function() {
        expect(!!Comment).toBe(true);
    });

    it('should provide a create function', function() {
        expect(typeof Comment.create).toBe('function');
    });
    it('create should return a comment', function() {
        var comment = Comment.create('text', 1);
        expect(typeof comment).toBe('object');
        expect(comment.comment_body.value).toBe('text');
        expect(comment.node).toBe(1);
    });

    it('should provide a getForTransactionRequest function', function() {
        expect(typeof Comment.getForTransactionRequest).toBe('function');
    });
    it('getForTransactionRequest should return a list of comments', function() {
        var transactionRequestId = 1;
        var comments = [{cid: 1}];
        $httpBackend.expectGET(ENV.apiEndpoint + '/entity_comment?parameters%5Bnode%5D=' + transactionRequestId)
        .respond(comments);

        Comment.getForTransactionRequest(transactionRequestId).then(function(comments) {
            expect(comments).toEqual(comments);
        });
        $httpBackend.flush();
        $rootScope.$digest();
    });
});
