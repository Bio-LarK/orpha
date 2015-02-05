'use strict';

describe('Service: Abstract', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var Abstract;
  beforeEach(inject(function (_Abstract_) {
    Abstract = _Abstract_;
  }));

  it('should do something', function () {
    expect(!!Abstract).toBe(true);
  });

});
