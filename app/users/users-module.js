  'use strict';

  angular.module('issueTracking.users', [])

    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'app/users/home.templ.html',
          controller: 'UsersController'
        })
      }]);

/*
      .controller('UsersController', ['$scope',
        function UsersController($scope) {
          $scope.hello = 'Hello!';
        }]); */
