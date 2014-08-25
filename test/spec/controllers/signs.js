'use strict';

describe('Controller: SignsCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var SignsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignsCtrl = $controller('SignsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
