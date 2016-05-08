'use strict';

angular
  .module('issueTracking.projects')
  .controller('AddIssueToProjectController', AddIssueToProjectController);

AddIssueToProjectController.$inject = [
    '$scope',
    '$routeParams',
    '$location',
    'projectsService',
    'notifyService'];

function AddIssueToProjectController($scope, $routeParams, $location, projectsService, notifyService) {
    $scope.allUsers();

    projectsService.getProjectById($routeParams.id)
        .then(function success(data) {
            $scope.projectPriorities = data.Priorities;
        });

    $scope.addIssueToProject = function(issueToAdd) {

        var issueToSend = {
            Title: issueToAdd.Title,
            Description: issueToAdd.Description,
            DueDate: issueToAdd.DueDate,
            ProjectId: $routeParams.id,
            AssigneeId: issueToAdd.AssigneeId,
            PriorityId: issueToAdd.PriorityId,
            Labels: issueToAdd.Labels.split(',')
        };

        projectsService.addIssueToProject(issueToSend)
            .then(function success(data) {
                $location.path('projects/' + data.Project.Id)
            }, function error(err) {
                notifyService.showError('Unable to add issue', err);
            });
    };
}
