'use strict';

angular
  .module('issueTracking.projects')
  .controller('ProjectsController', ProjectsController);

ProjectsController.$inject = [
    '$scope',
    '$location',
    'projectsService',
    'notifyService',
    'PAGE_SIZE'];

function ProjectsController($scope, $location, projectsService, notifyService, PAGE_SIZE) {

    $scope.projectsParams = {
        pageSize: PAGE_SIZE,
        pageNumber: 1
    };

    $scope.allUsers();

    $scope.getAllProjects = function() {
        projectsService.getAllProjects($scope.projectsParams)
            .then(function success(data) {
                $scope.allProjects = data.Projects;
                $scope.projectsCount = data.TotalPages * $scope.projectsParams.pageSize;
            }, function error(err) {
                notifyService.showError('Unable to get projects', err);
            });
    };

    $scope.getAllProjects();
}
