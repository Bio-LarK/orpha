'use strict';

describe('Service: prevalenceRepo', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var prevalenceRepo;
  beforeEach(inject(function (_prevalenceRepo_) {
    prevalenceRepo = _prevalenceRepo_;
  }));

  it('should do something', function () {
    expect(!!prevalenceRepo).toBe(true);
  });

});
