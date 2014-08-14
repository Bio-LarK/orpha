'use strict';

describe('Service: RelationshipService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var RelationshipService;
  beforeEach(inject(function (_RelationshipService_) {
    RelationshipService = _RelationshipService_;
  }));

  it('should do something', function () {
    expect(!!RelationshipService).toBe(true);
  });

});
