'use strict';

describe('Controller: HomerCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var HomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomerCtrl = $controller('HomerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
