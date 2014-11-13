'use strict';

describe('Service: Comment', function() {

    // load the service's module
    beforeEach(module('orphaApp'));

    // instantiate service
    var Comment;
    beforeEach(inject(function(_Comment_) {
        Comment = _Comment_;
    }));

    it('should do something', function() {
        expect(!!Comment).toBe(true);
    });

    it('should provide a create function', function() {
        expect(typeof Comment.create).toBe('function');
    });
    it('create should return a comment', function() {
        var comment = Comment.create('text', 1);
        console.log(comment);
        expect(typeof comment).toBe('object');
        expect(comment.comment_body.value).toBe('text');
        expect(comment.node).toBe(1);
    });

    it('should provide a getForTransactionRequest function', function() {
        expect(typeof Comment.findForTransactionRequest).toBe('function');
    });
    it('getForTransactionRequest should return a list of comments', function() {
        var result = Comment.findForTransactionRequest();
        expect(result).toBe('Not implemented');
    });
});
