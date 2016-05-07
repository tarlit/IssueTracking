'use strict';

angular
  .module('issueTracking.common')
  .factory('usersService', usersService);

usersService.$inject = ['$http', '$q', 'BASE_URL'];

function usersService($http, $q, BASE_URL) {

  return {
    getAllUsers: getAllUsers
  }

  function getAllUsers() {
    var deferred = $q.defer();

    var request = {
        method: 'GET',
        url: BASE_URL + 'users',
        headers: {
            Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
        }
    };

    $http(request)
        .then(function success(response) {
            deferred.resolve(response.data);
        }, function error(err) {
            deferred.reject(err);
        });

    return deferred.promise;
  };

}
