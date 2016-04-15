'use strict';

angular.module('issueTracking.users')

  .controller('UsersController', ['$scope',
    function UsersController($scope) {
      $scope.login = function (user) {
        // console.log(user);
      };

      $scope.register = function (user) {
        // console.log(user);
      };
    }]);
