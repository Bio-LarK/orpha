'use strict';

/**
 * @ngdoc function
 * @name orphaApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the orphaApp
 */
angular.module('orphaApp')
    .controller('UserCtrl', function(User, $stateParams, TransactionRequest) {
    	var vm = this;


    	activate();

    	//////////// 

    	function activate() {
    		// load the user
    		User.get({
    			uid: $stateParams.userId
    		}).$promise.then(function(user) {
    			vm.user = user;
    		});


    		// Get all the contributions for this user that...are accepted
    		TransactionRequest.getForUser($stateParams.userId).then(function(transactionRequests) {
    			vm.transactionRequests = transactionRequests;
    		});
    	}



    });
