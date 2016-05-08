'use strict';

angular
  .module('issueTracking.projects')
  .controller('MyProjectsController', MyProjectsController);

MyProjectsController.$inject = [
    '$scope',
    'projectsService',
    'notifyService',
    'PAGE_SIZE'];

function MyProjectsController($scope, projectsService, notifyService, PAGE_SIZE) {
    $scope.myProjectsParams = {
        pageSize: PAGE_SIZE,
        pageNumber: 1
    };

    $scope.getMyProjects = function() {
        projectsService.getUserProjects($scope.myProjectsParams)
            .then(function success(data) {
                $scope.myProjects = data.Projects;
                $scope.myTotalProjects = data.TotalCount;
            }, function error() {
                notifyService.showError('Unable to get user projects.', err);
            });
    };

    $scope.getMyProjects();
}
