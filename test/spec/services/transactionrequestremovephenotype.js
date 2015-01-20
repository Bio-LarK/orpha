'use strict';

describe('Service: TransactionRequestRemovePhenotype', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var TransactionRequestRemovePhenotype;
  beforeEach(inject(function (_TransactionRequestRemovePhenotype_) {
      TransactionRequestRemovePhenotype = _TransactionRequestRemovePhenotype_;
  }));

  it('should do something', function () {
    expect(!!TransactionRequestRemovePhenotype).toBe(true);
  });

});
