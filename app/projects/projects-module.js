'use strict';

angular.module('issueTracking.projects', [])

  .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/projects', {
            templateUrl: 'templates/projects/all-projects.html',
            controller: 'ProjectsController',
            access: {
                requiresAdmin: true
            }
        })

        .when('/projects/my', {
            templateUrl: 'templates/projects/my-projects.html',
            controller: 'MyProjectsController',
            access: {
                requiresLogin: true
            }
        })

        .when('/projects/add', {
            templateUrl: 'templates/projects/add-project.html',
            controller: 'AddProjectController',
            access: {
                requiresAdmin: true
            }
        })

        .when('/projects/:id', {
            templateUrl: 'templates/projects/project-details.html',
            controller: 'ViewProjectController',
            access: {
                requiresLogin: true
            }
        })

        .when('/projects/edit/:id', {
            templateUrl: 'templates/projects/edit-project.html',
            controller: 'EditProjectController',
            access: {
                requiresLogin: true
            }
        })

        .when('/projects/add-issue/:id', {
            templateUrl: 'templates/issues/add-issue.html',
            controller: 'AddIssueToProjectController',
            access: {
                requiresLogin: true
            }
        })
    }]);
