'use strict';

describe('Controller: DisorderCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var DisorderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisorderCtrl = $controller('DisorderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
