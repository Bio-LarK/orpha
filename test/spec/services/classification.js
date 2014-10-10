'use strict';

describe('Service: Classification', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var Classification;
  beforeEach(inject(function (_Classification_) {
    Classification = _Classification_;
  }));

  it('should do something', function () {
    expect(!!Classification).toBe(true);
  });

});
