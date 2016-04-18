'use strict';

angular.module('issueTracking.projects', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
      templateUrl: 'app/projects/projects.templ.html',
      controller: 'ProjectsController'
    })
  }])
