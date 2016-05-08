'use strict';

angular
  .module('issueTracking.common')

  .directive('ngHeader', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/common/header.html'
        }
    }])

    .directive('ngFooter', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/common/footer.html'
        }
    }])

    .directive('ngDashboard', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/home/dashboard.html'
        }
    }])

    .directive('ngLoginForm', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/common/login.html'
        }
    }])

    .directive('ngRegisterForm', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/common/register.html'
        }
    }]);
