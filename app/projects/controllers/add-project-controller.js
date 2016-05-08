'use strict';

angular
  .module('issueTracking.projects')
  .controller('AddProjectController', AddProjectController);

AddProjectController.$inject = [
    '$scope',
    '$location',
    'projectsService',
    'notifyService'];

function AddProjectController($scope, $location, projectsService, notifyService) {

    $scope.allUsers();

    $scope.addProject = function(project) {
        projectsService.addProject(project)
            .then(function success(data) {
                $location.path('projects/' + data.Id);
            }, function error(err) {
                notifyService.showError('Unable to add project', err);
            });
    };

}
