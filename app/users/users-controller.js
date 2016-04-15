'use strict';

angular.module('issueTracking.users')

  .controller('UsersController', [
    '$scope', 'authentication',
    function UsersController($scope, authentication) {
      $scope.login = function (user) {
         //console.log(user);
         authentication.login(user);
      };

      $scope.register = function (user) {
         //console.log(user);
         authentication.register(user)
          .then(function (registeredUser) {
            console.log(registeredUser);
          });
      };
    }]);
