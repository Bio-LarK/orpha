'use strict';

describe('Controller: ModalsRemovedisorderfromclassificationCtrl', function () {

  // load the controller's module
  beforeEach(module('orphaApp'));

  var ModalsRemovedisorderfromclassificationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalsRemovedisorderfromclassificationCtrl = $controller('ModalsRemovedisorderfromclassificationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
