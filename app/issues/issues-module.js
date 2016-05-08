'use strict';

angular.module('issueTracking.issues', [])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/issues/:id', {
              templateUrl: 'templates/issues/issue-details.html',
              controller: 'ViewIssueController',
              access: {
                  requiresLogin: true
              }
          })
          .when('/issues/edit/:id', {
              templateUrl: 'templates/issues/edit-issue.html',
              controller: 'EditIssueController',
              access: {
                  requiresLogin: true
              }
          })
  }]);
