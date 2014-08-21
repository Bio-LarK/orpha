'use strict';

describe('Service: GroupByService', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var GroupByService;
  beforeEach(inject(function (_GroupByService_) {
    GroupByService = _GroupByService_;
  }));

  it('should do something', function () {
    expect(!!GroupByService).toBe(true);
  });

});
