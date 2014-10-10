'use strict';

describe('Service: disorderRepo', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var disorderRepo;
  beforeEach(inject(function (_disorderRepo_) {
    disorderRepo = _disorderRepo_;
  }));

  it('should do something', function () {
    expect(!!disorderRepo).toBe(true);
  });

});
