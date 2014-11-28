'use strict';

describe('Controller: ModalsRemoveDisorderFromClassificationCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var ModalsRemoveDisorderFromClassificationCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ModalsRemoveDisorderFromClassificationCtrl = $controller('ModalsRemoveDisorderFromClassificationCtrl', {
            $scope: scope
        });
    }));
});
