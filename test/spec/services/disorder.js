'use strict';

describe('Service: disorder', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var disorder;
  beforeEach(inject(function (_disorder_) {
    disorder = _disorder_;
  }));

  it('should do something', function () {
    expect(!!disorder).toBe(true);
  });

});
