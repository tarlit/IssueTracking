'use strict';

angular.module('issueTracking', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap.pagination',
  'issueTracking.common'
])

  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')

  .constant('PAGE_SIZE', 10)

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])

  .run(['$rootScope',
        '$location',
        'authService',
        function($rootScope, $location, authService) {
            $rootScope.$on('$routeChangeStart', function(event, nextRoute) {
                if(nextRoute.access) {
                    if(nextRoute.access.requiresLogin && !authService.isAuthenticated()) {
                        $location.path('/');
                    }

                    if(nextRoute.access.requiresAdmin && !authService.isAdmin()) {
                        $location.path('/');
                    }
                }else {
                    $location.path('/');
                }
            });
    }]);
