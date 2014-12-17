'use strict';

describe('Controller: LoginmodalCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var LoginmodalCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginmodalCtrl = $controller('LoginmodalCtrl', {
            $scope: scope
        });
    }));
});
