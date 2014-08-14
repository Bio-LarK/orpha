'use strict';

describe('Service: gene', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var gene;
  beforeEach(inject(function (_gene_) {
    gene = _gene_;
  }));

  it('should do something', function () {
    expect(!!gene).toBe(true);
  });

});
