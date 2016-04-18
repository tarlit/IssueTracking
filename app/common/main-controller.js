'use strict';

angular.module('issueTracking.common')

  .controller('MainController', [
    '$scope',
    '$http',
    'identity',
    function MainController($scope, $http, identity) {

      identity.getCurrentUser()
        .then(function (user) {
          $scope.currentUser= user;
        });

    }]);
