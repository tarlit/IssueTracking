'use strict';

angular
  .module('issueTracking.issues')
  .factory('issuesService', issuesService);

issuesService.$inject = ['$http', '$q', 'BASE_URL'];

function issuesService($http, $q, BASE_URL) {

  var service = {
      getUserIssues: getUserIssues,
      getIssueById: getIssueById,
      editIssue: editIssue,
      changeIssueStatus: changeIssueStatus
  }

  return service;

  function getUserIssues(criteria, params) {
    var deferred = $q.defer(),
        serviceUrl = BASE_URL + 'issues/me?orderBy=' + criteria + ' desc&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

    var request = {
        method: 'GET',
        url: serviceUrl,
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

  function getIssueById(id) {
    var deferred = $q.defer();

    var request = {
        method: 'GET',
        url: BASE_URL + 'issues/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
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

  function editIssue(issue, id) {
    var deferred = $q.defer();

    var dataLabels = '';
    issue.Labels.forEach(function(l, index) {
        dataLabels += '&labels[' + index + '].Name=' + l.trim();
    });

    var editedIssue = 'Title=' + issue.Title +
            '&Description=' + issue.Description +
            '&DueDate=' + issue.DueDate.toISOString() +
            '&AssigneeId=' + issue.AssigneeId +
            '&PriorityId=' + issue.PriorityId +
            dataLabels;

    var request = {
        method: 'PUT',
        url: BASE_URL + 'issues/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: editedIssue
    };

    $http(request)
        .then(function success(response) {
            deferred.resolve(response.data);
        }, function error(err) {
            console.log(err);
            deferred.reject(err);
        });

    return deferred.promise;
  };

  function changeIssueStatus(issueId, statusId) {
    var deferred = $q.defer();

    var request = {
        method: 'PUT',
        url: BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
        }
    };

    $http(request)
        .then(function success(response) {
            deferred.resolve(response);
        }, function error() {
            deferred.reject(err);
        });

    return deferred.promise;
  };

}
