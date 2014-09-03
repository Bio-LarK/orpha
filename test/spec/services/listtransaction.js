'use strict';

describe('Service: ListTransaction', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var ListTransaction;
  beforeEach(inject(function (_ListTransaction_) {
    ListTransaction = _ListTransaction_;
  }));

  it('should do something', function () {
    expect(!!ListTransaction).toBe(true);
  });

});
