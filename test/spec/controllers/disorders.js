'use strict';

describe('Controller: DisordersCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var DisordersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisordersCtrl = $controller('DisordersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
