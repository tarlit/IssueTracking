'use strict';

angular.module('issueTracking', [
  'ngRoute',
  'issueTracking.users'])

  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net')

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
/*
.congig($routeProvider)
....
$routeProvider
  .when('/projects/all', {
    templateUrl: 'getAllProjects.html',
    controller: 'ProjectsController'
    // loggedIn
  })
  .when('/projects/:id',{
    templateUrl: 'project.html',
    controller: 'ProjectsController'
    // loggedIn
  })
  .when('/projects/add', {
    templateUrl: 'addProject.html',
    controller: 'AdminController'
    // Admin
  })
  .when('/projects/:id/edit',{
    templateUrl: 'editProject.html',
    controller: 'AdminConroller'
    // Admin
  })
  .when('/projects/:id/leadEdit',{
    templateUrl: 'editProject.html',
    controller: 'ProjectsController'
    // project leader
  })
  .when('projects/:id/issues',{
    templateUrl: 'project.html',
    controller: 'ProjectsController'
    // loggedIn
  })
  .when('/issues/?filter', {
    templateUrl: 'allIssues.html',
    controller: 'IssuesController'
    // loggedIn
  })
  .when('/issues/me?orderBy', {
    templateUrl: 'allIssues.html',
    controller: 'IssuesController'
    // loggedIn
  })
  .when('/issues/:id', {
    templateUrl: 'issue.html',
    controller: 'IssuesController'
    //loggedIn
  })
  .when('issues/add', {
    templateUrl: 'addIssue.html',
    controller: 'AdminController'
    // Admin
  })
  .when('issues/add', {
    templateUrl: 'addIssue.html',
    controller: 'IssuesController'
    // project leader
  })
  .when('issues/:id/edit', {
    templateUrl: 'editIssue.html',
    controller: 'AdminController'
    // Admin
  })
  .when('issues/:id/edit', {
    templateUrl: 'editIssue.html',
    controller: 'IssueController'
    // project leader
  })
  .when('/issues/:id?newStatus', {
    templateUrl: 'changeStatus.html',
    controller: 'AdminController'
    // Admin
  })
  .when('/issues/:id?newStatus', {
    templateUrl: 'changeStatus.html',
    controller: 'IssueController'
    // project leader
  })
  .when('/issues/:id?newStatus', {
    templateUrl: 'changeStatus.html',
    controller: 'IssueController'
    // project assignee user
  })
)

*/
