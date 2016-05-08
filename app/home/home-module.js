'use strict';

angular.module('issueTracking.home', [])

  .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/common/welcome.html',
                controller: 'HomeController',
                access: {
                    requiresLogin: true
                }
            })
    }]);
