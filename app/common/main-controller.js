'use strict';

angular
  .module('issueTracking.common')
  .controller('MainController', MainController);

MainController.$inject = [
      '$scope',
      '$location',
      'authService',
      'usersService',
      'notifyService'];

function MainController($scope, $location, authService, usersService, notifyService) {
  
  $scope.isAuthenticated = function() {
      return authService.isAuthenticated();
  };

  $scope.isAdmin = function() {
      return authService.isAdmin();
  };

  $scope.logout = function() {
      authService.logoutUser()
          .then(function success() {
              sessionStorage.clear();
              notifyService.showSuccess('User logout');
              $location.path('/');
          }, function error(err) {
              notifyService.showError('Unsuccessful logout', err);
          });
  };

  $scope.changePassword = function(user) {
      authService.changePassword(user)
          .then(function success() {
              notifyService.showSuccess('Password changed successfully!');
              $location.path('/');
          }, function error(err) {
              notifyService.showError('Failed to change password.', err);
          });
  };

  $scope.allUsers = function() {
      usersService.getAllUsers()
          .then(function success(response) {
              $scope.users = response;
          }, function error(err) {
              notifyService.showError('Unable to get users', err)
          });
  };

}
