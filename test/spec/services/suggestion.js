'use strict';

describe('Service: Suggestion', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var Suggestion;
  beforeEach(inject(function (_Suggestion_) {
    Suggestion = _Suggestion_;
  }));

  it('should do something', function () {
    expect(!!Suggestion).toBe(true);
  });

});
