'use strict';

describe('Service: concept', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var concept;
  beforeEach(inject(function (_concept_) {
    concept = _concept_;
  }));

  it('should do something', function () {
    expect(!!concept).toBe(true);
  });

});
