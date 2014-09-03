'use strict';

describe('Service: PrevalenceClass', function () {

  // load the service's module
  beforeEach(module('orphaApp'));

  // instantiate service
  var PrevalenceClass;
  beforeEach(inject(function (_PrevalenceClass_) {
    PrevalenceClass = _PrevalenceClass_;
  }));

  it('should do something', function () {
    expect(!!PrevalenceClass).toBe(true);
  });

});
