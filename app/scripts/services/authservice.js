'use strict';

/**
 * @ngdoc service
 * @name orphaApp.authService
 * @description
 * # authService
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
    .factory('authService', function($modal, $http, $cookies, $q, $state, $rootScope, ENV) {
        var authService = {
            openLoginModal: openLoginModal,
            isLoginRequiredToState: isLoginRequiredToState,
            isSessionValid: isSessionValid,
            login: login,
            logout: logout
        };
        return authService;

        ///////

        function assignCurrentUser(user) {
            authService.currentUser = user;
            return user;
        }

        function openLoginModal() {
            var instance = $modal.open({
                templateUrl: 'views/modals/login.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'vm'
            });
            return instance.result;
        }

        function getCurrentSession() {
            return getCSRF().then(function() {
                return $http.post(ENV.apiEndpoint + '/system/connect', {}).then(function(response) {
                    return response.data;
                });
            });
        }

        function login(credentials) {
            return getCSRF().then(function() {
                return $http.post(ENV.apiEndpoint + '/user/login', credentials).then(function(response) {
                    var session = response.data;
                    saveCSRF(session.token);
                    if (isNotProduction()) {
                        hackCookies(session);
                    }
                    return assignCurrentUser(session.user);
                });
            });
        }

        function logout() {
            return $http.post(ENV.apiEndpoint + '/user/logout', {}).then(function(response) {
                delete authService.currentUser;
                // TODO: decouple this from determining the default state

                if(isLoginRequiredToState($state.current)) {
                    $state.go('home');
                }
            });
        }
        function getCSRF() {
            return $http.post(ENV.apiEndpoint + '/user/token', {}).then(function(response) {
                var token = response.data.token;
                saveCSRF(token);
                return token;
            });
        }
        function saveCSRF(token) {
            $http.defaults.headers.post['X-CSRF-Token'] = token;
        }

        function isLoginRequiredToState(toState) {
            if (!toState.data) {
                return false;
            }
            var requireLogin = toState.data.requireLogin;
            return requireLogin && typeof authService.currentUser === 'undefined';
        }

        function isSessionValid() {
            if (authService.currentUser) {
                return $q.when(true);
            }
            return getCurrentSession().then(function(session) {
                if (isLoggedInSession(session)) {
                    if (isNotProduction()) {
                        hackCookies(session);
                    }
                    return !!assignCurrentUser(session.user);
                }
                return false;
            });
        }

        function isLoggedInSession(session) {
            return !isAnonymousUser(session.user);
        }

        function isAnonymousUser(user) {
            return user.uid === 0;
        }

        function isNotProduction() {
            return window.location.hostname.indexOf('orpha') === -1;
        }

        function hackCookies(session) {
            $cookies[session.session_name] = session.sessid;
        }
    });
