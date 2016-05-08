'use strict';

angular
  .module('issueTracking.common')
  .factory('authService', authService);

authService.$inject = ['$http', '$q', 'BASE_URL'];

function authService($http, $q, BASE_URL) {

  var service = {
    register: register,
    login: login,
    logout: logout,
    getCurrentUser: getCurrentUser,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    changePassword: changePassword
  };

  return service;

  function register(user) {
    var deferred = $q.defer(),
        registerData = {
          Email: user.username,
          Password: user.password,
          ConfirmPassword: user.confirmPassword
        };

    var request = {
      method: 'POST',
      url: BASE_URL + 'api/Account/Register',
      data: registerData
    };

    $http(request)
      .then(function success() {
          deferred.resolve();
      }, function error(err) {
          deferred.reject(err);
      });

    return deferred.promise;
  };

  function login(user) {
    var deferred = $q.defer(),
        loginData = "grant_type=password&username=" + user.username + "&password=" + user.password;

		var request = {
			method: 'POST',
			url: BASE_URL + 'api/Token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
			data: loginData
		};

    $http(request)
        .then(function success(response) {
            var userData = response.data;

            var userInfoRequest = {
                method: 'GET',
                url: BASE_URL + 'users/me',
                headers: { Authorization: 'Bearer ' + userData.access_token }
            };

            $http(userInfoRequest)
                .then(function success(data) {
                    userData.isAdmin = data.data.isAdmin;
                    userData.Id = data.data.Id;
                    sessionStorage['currentUser'] = JSON.stringify(userData);
                    deferred.resolve(data);
                }, function error(err) {
                    deferred.reject(err);
                });

        }, function error(err) {
            deferred.reject(err);
        });

    return deferred.promise;
  };

  function logout() {
    var deferred = $q.defer(),
        currentUser = getCurrentUser();

    var request = {
        method: 'POST',
        url: BASE_URL + 'api/Account/Logout',
        headers: {
            'Authorization': 'Bearer ' + currentUser.access_token
        }
    };

    $http(request)
        .then(function success() {
            deferred.resolve();
        }, function error(err) {
            deferred.reject(err);
        });

    return deferred.promise;
  };

  function getCurrentUser() {
    var userObject = sessionStorage['currentUser'];
    if (userObject) {
        return JSON.parse(sessionStorage['currentUser']);
    }
  };

  function isAuthenticated() {
    return sessionStorage['currentUser'] != undefined;
  }

  function isAdmin() {
    var currentUser = getCurrentUser();

    return (currentUser != undefined) && (currentUser.isAdmin);
  }

  function changePassword(user) {
    var deferred = $q.defer(),
        currentUser = getCurrentUser(),
        passwordData = 'OldPassword=' + user.oldPassword +
            '&NewPassword=' + user.newPassword +
            '&ConfirmPassword=' + user.newPasswordConfirm;

    var request = {
        method: 'POST',
        url: BASE_URL + 'api/Account/ChangePassword',
        data: passwordData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + currentUser.access_token
        }
    };

    $http(request)
        .then(function success() {
            deferred.resolve()
        }, function error(err) {
            deferred.reject(err);
        });

    return deferred.promise;
  };

}
