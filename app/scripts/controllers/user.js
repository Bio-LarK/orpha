'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('UserCtrl', function(User, $stateParams, TransactionRequest, Page, transactionStatusService) {
        var vm = this;
        vm.totalItems = 40;
        vm.currentPage = 0;
        vm.ITEMS_PER_PAGE = 20;

        activate();

        //////////// 

        function activate() {

            Page.setTitle('User');

            // load the user
            User.get({
                uid: $stateParams.userId
            }).$promise.then(function(user) {
                vm.user = user;
                Page.setTitle(user.name);
            });

            // Get all the contributions for this user that...are accepted
            TransactionRequest.getForUser($stateParams.userId).then(function(transactionRequests) {
                vm.transactionRequests = transactionRequests;
            });
        }



    });
