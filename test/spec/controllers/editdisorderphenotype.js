'use strict';

describe('Controller: EditdisorderphenotypeCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var EditdisorderphenotypeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditdisorderphenotypeCtrl = $controller('EditdisorderphenotypeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
