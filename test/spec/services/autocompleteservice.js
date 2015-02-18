'use strict';

describe('Service: autocompleteService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var autocompleteService;
  beforeEach(inject(function (_autocompleteService_) {
    autocompleteService = _autocompleteService_;
  }));

  it('should do something', function () {
    expect(!!autocompleteService).toBe(true);
  });

});
