'use strict';

angular
  .module('issueTracking.issues')
  .controller('ViewIssueController', ViewIssueController);

ViewIssueController.$inject = [
    '$scope',
    '$routeParams',
    'issuesService',
    'commentsService',
    'projectsService',
    'notifyService'];

function ViewIssueController($scope, $routeParams, issuesService, commentsService, projectsService, notifyService) {
    $scope.issueComment = {};

    $scope.getIssueById = function() {
        issuesService.getIssueById($routeParams.id)
            .then(function success(data) {
                $scope.currentIssue = data;

                if(data.Assignee.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                    $scope.isAssignee = true;
                }else {
                    $scope.isAssignee = false;
                }

                $scope.currentIssueLabels = [];

                data.Labels.forEach(function(label) {
                    $scope.currentIssueLabels.push(label.Name);
                });

                projectsService.getProjectById(data.Project.Id)
                    .then(function success(data) {
                        if(data.Lead.Id === JSON.parse(sessionStorage['currentUser']).Id) {
                            $scope.isLeadOfProject = true;
                        }else {
                            $scope.isLeadOfProject = false;
                        }
                    });

            }, function error(err) {
                notifyService.showError('Unable to get issue', err);
            });
    };

    $scope.getIssueComments = function() {
        commentsService.getIssueComments($routeParams.id)
            .then(function success(data) {
                $scope.issueComments = data;
            }, function error(err) {
                notifyService.showError('Unable to get comments', err);
            });
    };

    $scope.changeStatus = function(statusId) {
        issuesService.changeStatus($routeParams.id, statusId)
            .then(function() {
                $scope.getIssueById();
            }, function error(err) {
                notifyService.showError('Unable to change status', err);
            });
    };

    $scope.addComment = function(comment) {
        commentsService.addCommentToIssue($routeParams.id, comment)
            .then(function success(data) {
                $scope.issueComments = data;
                $scope.issueComment.Text = '';
            }, function error(err) {
                notifyService.showError('Unable to add comment', err);
            });
    };

    $scope.getIssueById();
    $scope.getIssueComments();
}
