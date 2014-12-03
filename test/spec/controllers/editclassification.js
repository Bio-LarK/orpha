'use strict';

describe('Controller: EditClassificationCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var EditclassificationCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        EditclassificationCtrl = $controller('EditClassificationCtrl', {
            $scope: scope
        });
    }));
});
