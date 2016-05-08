'use strict';

angular
  .module('issueTracking.issues')
  .controller('EditIssueController', EditIssueController);

EditIssueController.$inject = [
    '$scope',
    '$routeParams',
    '$location',
    'issuesService',
    'projectsService',
    'notifyService'];

function EditIssueController($scope, $routeParams, $location, issuesService, projectsService, notifyService) {
    $scope.allUsers();

    issuesService.getIssueById($routeParams.id)
        .then(function success(data) {
            $scope.currentIssue = data;
            $scope.currentIssueDueDateLocal = new Date(data.DueDate);
            $scope.issuePriority = data.Priority.Id;
            $scope.currentIssueLabels = [];

            data.Labels.forEach(function(label) {
                $scope.currentIssueLabels.push(label.Name);
            });

            projectsService.getProjectById(data.Project.Id)
                .then(function success(data) {
                    $scope.projectPriorities = data.Priorities;

                    if(data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                        $scope.isLeadOfProject = true;
                    }else {
                        $scope.isLeadOfProject = false;
                    }
                });
        }, function error(err) {
            notifyService.showError('Unable to get issue', err);
        });

    $scope.editIssue = function() {
        if(typeof $scope.currentIssueLabels === 'string') {
            $scope.currentIssueLabels = $scope.currentIssueLabels.split(',');
        }

        var issueToEdit = {
            Title: $scope.currentIssue.Title,
            Description: $scope.currentIssue.Description,
            DueDate: $scope.currentIssueDueDateLocal,
            AssigneeId: $scope.currentIssue.Assignee.Id,
            PriorityId: $scope.issuePriority.Id,
            Labels: $scope.currentIssueLabels
        };

        issuesService.editIssue(issueToEdit, $routeParams.id)
            .then(function success(data) {
                $location.path('issues/' + data.Id);
            }, function error(err) {
                notifyService.showError('Unable to edit issue', err);
            });
    };
}
