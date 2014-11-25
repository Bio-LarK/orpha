'use strict';

describe('Controller: ModalsAdddisordertoclassificationCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var ModalsAdddisordertoclassificationCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ModalsAdddisordertoclassificationCtrl = $controller('ModalsAdddisordertoclassificationCtrl', {
            $scope: scope
        });
    }));
});
