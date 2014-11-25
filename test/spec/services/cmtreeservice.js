'use strict';

describe('Service: cmTreeService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var cmTreeService;
  beforeEach(inject(function (_cmTreeService_) {
    cmTreeService = _cmTreeService_;
  }));

  it('should do something', function () {
    expect(!!cmTreeService).toBe(true);
  });

});
