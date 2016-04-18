'use strict';

angular.module('issueTracking.users')

  .factory('authentication', [
    '$http', '$q', 'BASE_URL',
    function ($http, $q, BASE_URL) {

      function register(user) {
        var deferred = $q.defer();
        $http.post(BASE_URL + 'api/Account/Register', user)
          .then(function (responce) {
            deferred.resolve(responce.data);
          }, function (error) {
            console.log(error);
          });

        return deferred.promise;
      }

      function login(user) {
        var deferred = $q.defer();
        $http.post(BASE_URL + 'api/Token', user)
          .then(function (responce) {
            deferred.resolve(responce.data);
          }, function (error) {
            console.log(error);
          });

        return deferred.promise;
      }

      function logout() {

      }

      return {
        register: register,
        login: login,
        logout: logout
      }
    }
  ])
