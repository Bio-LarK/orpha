'use strict';

describe('Service: siteSearchService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var siteSearchService;
  beforeEach(inject(function (_siteSearchService_) {
    siteSearchService = _siteSearchService_;
  }));

  it('should do something', function () {
    expect(!!siteSearchService).toBe(true);
  });

});
