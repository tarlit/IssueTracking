'use strict';

angular
  .module('issueTracking.projects')
  .controller('ViewProjectController', ViewProjectController);

ViewProjectController.$inject = [
    '$scope',
    '$routeParams',
    'projectsService',
    'notifyService'];

function ViewProjectController($scope, $routeParams, projectsService, notifyService) {

  projectsService.getProjectById($routeParams.id)
      .then(function success(data) {
          $scope.currentProject = data;

          if(data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
              $scope.isLeadOfProject = true;
          }else {
              $scope.isLeadOfProject = false;
          }

          $scope.currentProjectLabels = [];
          $scope.currentProjectPriorities = [];

          data.Labels.forEach(function(l) {
              $scope.currentProjectLabels.push(l.Name);
          });

          data.Priorities.forEach(function(p) {
              $scope.currentProjectPriorities.push(p.Name);
          });
      }, function error(err) {
          notifyService.showError('Unable to get project', err);
      });

  projectsService.getIssues($routeParams.id)
      .then(function success(issuesData) {
          $scope.currentProjectIssues = issuesData;
          $scope.currentProjectIssuesAssignees = [];
          $scope.currentProjectIssuesPriorities = [];

          issuesData.forEach(function(issue) {

              if($scope.currentProjectIssuesAssignees.indexOf(issue.Assignee.Username) === -1) {
                  $scope.currentProjectIssuesAssignees.push(issue.Assignee.Username);
              }

              if($scope.currentProjectIssuesPriorities.indexOf(issue.Priority.Name) === -1) {
                  $scope.currentProjectIssuesPriorities.push(issue.Priority.Name);
              }
          });
      }, function error(err) {
          notifyService.showError('Unable to get issues', err);
      });
}
