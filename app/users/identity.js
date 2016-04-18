'use strict';

angular.module('issueTracking.users')

  .factory('identity', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, BASE_URL) {

      var deferred = $q.defer();
      var currentUser = undefined;

      var accessToken = 'UjesBbTBizwCAVj9rT-csA4DSBiyDaqUOQBnVheHbcZ3bQBihXXNrZAo8je-Y7CtkIYDEi3VQLBfWDTs9pRcyURVfrF4O3cI-OocV6q83XxntBaYKbHKsycy8tAJM6w0Jn15G6XLF-x_OrSYjdWQQJwuFFNfAAotzFdncOMIZwQ8jUK73c2ONQLaJse-x8XysTZrHwhpBRb2I69Ks1gZrRtyPn613IAFS_14uE8NH7vs98k6w802DmK2OoBcYtqZfCZjInp944j1a1K0wex9bDWWWoXqQ5hwocmBZVOhj_5vnl3-gCHLYB8LjJ5YeSgxDhMxTC0MXTTRB3Ec-D-M9qWGOWtJtXATs1qcRRvlNebpCrQN_IUGA7Px5dTGR0hBb5uLvYGyv4gqQkeU-zG3zwlPrs_UgxodUGgCwsLC_lEdkbSxoiMzVQhJI94-h0GMWN2kVHQ2qo5JqKLWQ4PcmL-AuruNnaqQbYsskH6xF0MDBGzBnwfWjRC50fXYF9_t';

      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

      $http.get(BASE_URL + 'users/me')
          .then(function (responce) {
            //console.log(responce.data);
            currentUser = responce.data;
            deferred.resolve(currentUser);
          });

      return {
        getCurrentUser: function () {
          if (currentUser) {
            return $q.when(currentUser);
          }
          else  {
            return deferred.promise;
          }
        },
        isAuthenticated: function () {
          return !!currentUser;
        }
      };
    }
  ])
