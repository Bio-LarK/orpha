'use strict';

describe('Controller: ModalEditClassificationCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var ModalEditClassificationCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ModalEditClassificationCtrl = $controller('ModalEditClassificationCtrl', {
            $scope: scope
        });
    }));

});
