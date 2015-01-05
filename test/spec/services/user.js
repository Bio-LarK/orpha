'use strict';

describe('Service: User', function() {

    // load the service's module
    beforeEach(module('orphaApp'));

    // instantiate service
    var user;
    beforeEach(inject(function(_User_) {
        user = _User_;
    }));

    it('should exist', function() {
        expect(!!user).toBe(true);
    });

});
