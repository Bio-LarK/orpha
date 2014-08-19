'use strict';

describe('Directive: cmTree', function () {

  // load the directive's module
  beforeEach(module('orphaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cm-tree></cm-tree>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cmTree directive');
  }));
});
