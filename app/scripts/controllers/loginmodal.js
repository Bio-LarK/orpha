'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:LoginmodalCtrl
 * @description
 * # LoginmodalCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('LoginModalCtrl', function($modalInstance, $http, authService, $cookies) {
        var vm = this;
        vm.credentials = {};
        vm.login = login;
        vm.cancel = cancel;

        function login() {
            authService.login(vm.credentials).then(function(user) {
                $modalInstance.close(user);
            });

            // authService.currentUser = user;
            // });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    });
