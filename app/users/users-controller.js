'use strict';

angular.module('issueTracking.users')

  .controller('UsersController', [
    '$scope', '$location', 'authentication',
    function UsersController($scope, $location, authentication) {
      $scope.login = function (user) {
         //console.log(user);
         authentication.login(user)
          .then(function (currentUser) {
            console.log(currentUser);
            $location.path('/projects');
          })
      };

      $scope.register = function (user) {
         //console.log(user);
         authentication.register(user)
          .then(function (registeredUser) {
            console.log(registeredUser);
            //$location.path('/login');
          });
      };
    }]);
