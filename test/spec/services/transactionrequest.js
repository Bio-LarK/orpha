'use strict';

describe('Service: transactionrequest', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var transactionrequest;
  beforeEach(inject(function (_transactionrequest_) {
    transactionrequest = _transactionrequest_;
  }));

  it('should do something', function () {
    expect(!!transactionrequest).toBe(true);
  });

});
