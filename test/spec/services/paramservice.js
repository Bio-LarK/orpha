'use strict';

describe('Service: paramService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var paramService;
  beforeEach(inject(function (_paramService_) {
    paramService = _paramService_;
  }));

  it('should do something', function () {
    expect(!!paramService).toBe(true);
  });

});
