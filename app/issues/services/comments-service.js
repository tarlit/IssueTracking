'use strict';

angular
  .module('issueTracking.issues')
  .factory('commentsService', commentsService);

commentsService.$inject = ['$http', '$q', 'BASE_URL'];

function commentsService($http, $q, BASE_URL) {

  var service = {
    getIssueComments: getIssueComments,
    addCommentToIssue: addCommentToIssue
  }

  return service;

  function getIssueComments(id) {
      var deferred = $q.defer();

      var request = {
          method: 'GET',
          url: BASE_URL + 'issues/' + id + '/comments',
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
          }
      };

      $http(request)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function addCommentToIssue(issueId, comment) {
      var deferred = $q.defer();

      var request = {
          method: 'POST',
          url: BASE_URL + 'issues/' + issueId + '/comments',
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
          },
          data: comment
      };

      $http(request)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

}
