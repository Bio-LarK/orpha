'use strict';

describe('Controller: TransactionRequestModalCtrl', function() {

    // load the controller's module
    beforeEach(module('orphaApp'));

    var TransactionRequestModalCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        TransactionRequestModalCtrl = $controller('TransactionRequestModalCtrl', {
            $scope: scope
        });
    }));
});
