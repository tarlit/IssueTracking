'use strict';

angular
  .module('issueTracking.home')
  .controller('HomeController', HomeController);

HomeController.$inject = [
    '$scope',
    '$location',
    'authService',
    'issuesService',
    'notifyService',
    'PAGE_SIZE'];

function HomeController($scope, $location, authService, issuesService, notifyService, PAGE_SIZE) {
  $scope.issuesParams = {
      pageSize: PAGE_SIZE,
      pageNumber: 1
  };

  $scope.register = function(user) {
      authService.register(user)
          .then(function success() {
              notifyService.showSuccess('User registered successfully!');
              $scope.login(user);
          }, function error(err) {
              notifyService.showError('Registration failed!', err);
          });
  };

  $scope.login = function(user) {
      authService.login(user)
          .then(function success(userData) {
              $scope.getUserIssues();
              notifyService.showSuccess('User logged in successfully!');
          }, function error(err) {
              notifyService.showError('Login failed!', err);
          });
  };

  $scope.getUserIssues = function(predicate) {
      var criteria = predicate || 'DueDate';

      if(authService.isAuthenticated()) {
          issuesService.getUserIssues(criteria, $scope.issuesParams)
              .then(function success(data) {
                  $scope.userIssues = data.Issues;
                  $scope.userIssuesCount = data.TotalPages * $scope.issuesParams.pageSize;
              }, function error(err) {
                  notifyService.showError('Unable to get issues', err);
              });
      }
  };

  $scope.getUserIssues();

}
