'use strict';

describe('Service: disorderBodyService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var disorderBodyService;
  beforeEach(inject(function (_disorderBodyService_) {
    disorderBodyService = _disorderBodyService_;
  }));

  it('should do something', function () {
    expect(!!disorderBodyService).toBe(true);
  });

});
