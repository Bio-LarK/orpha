/*
Example AngularJS Application
=============================
Service Mocks
-------------
*/
'use strict';


angular.module('authServiceMock', []).service('authService', function() {
    this.isSessionValid = jasmine.createSpy('isSessionValid');
    this.isLoginRequiredToState = jasmine.createSpy('authService.isLoginRequiredToState');
    return this;
});
