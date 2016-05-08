'use strict';

angular.module('issueTracking.common', [])

  .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile/password', {
                templateUrl: 'templates/home/change-password.html',
                controller: 'MainController',
                access: {
                    requiresLogin: true
                }
            })
    }]);
