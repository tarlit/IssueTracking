'use strict';

angular
  .module('issueTracking.projects')
  .factory('projectsService', projectsService);

projectsService.$inject = ['$http', '$q', 'BASE_URL'];

function projectsService($http, $q, BASE_URL) {

  var service = {
    getAllProjects: getAllProjects,
    getUserProjects: getUserProjects,
    addProject: addProject,
    editProject: editProject,
    getProjectById: getProjectById,
    getIssues: getIssuesByProjectId,
    addIssueToProject: addIssueToProject
  }

  return service;

  function getAllProjects(params) {
      var deferred = $q.defer(),
          serviceUrl = BASE_URL + 'projects?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

      var projectsRequest = {
              method: 'GET',
              url: serviceUrl,
              headers: {
                  'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
              }
          };

      $http(projectsRequest)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function getUserProjects(params) {
      var deferred = $q.defer(),
          leadId = JSON.parse(sessionStorage['currentUser']).Id,
          serviceUrl = BASE_URL + 'projects?filter=Lead.Id="' + leadId +'"&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

      var projectsRequest = {
          method: 'GET',
          url: serviceUrl,
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
          }
      };

      $http(projectsRequest)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function addProject(project) {
      var deferred = $q.defer();

      var labels = project.labels.split(','),
          dataLabels = '';
      labels.forEach(function(l, index) {
          dataLabels += '&labels[' + index + '].Name=' + l.trim();
      });

      var priorities = project.priorities.split(','),
          dataPriorities = '';
      priorities.forEach(function(p, index) {
          dataPriorities += '&priorities[' + index + '].Name=' + p.trim();
      });

      var projectData = 'Name=' + project.name +
              '&Description=' + project.description +
              '&ProjectKey=' + project.key +
              dataLabels + dataPriorities +
              '&LeadId=' + project.leadId;

      var request = {
          method: 'POST',
          url: BASE_URL + 'projects',
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: projectData
      };

      $http(request)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function editProject(project, id) {
      var deferred = $q.defer();

      var dataLabels = '';
      project.Labels.forEach(function(l, index) {
          dataLabels += '&labels[' + index + '].Name=' + l.trim();
      });

      var dataPriorities = '';
      project.Priorities.forEach(function(p, index) {
          dataPriorities += '&priorities[' + index + '].Name=' + p.trim();
      });

      var editedProject = 'Name=' + project.Name +
          '&Description=' + project.Description +
          dataLabels + dataPriorities +
          '&LeadId=' + project.LeadId;

      var request = {
          method: 'PUT',
          url: baseUrl + 'projects/' + id,
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: editedProject
      };

      $http(request)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function getProjectById(projectId) {
      var deferred = $q.defer(),
          projectRequest = {
              method: 'GET',
              url: BASE_URL + 'projects/' + projectId,
              headers: {
                  'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
              }
          };

      $http(projectRequest)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function getIssuesByProjectId(projectId) {
      var deferred = $q.defer(),
          issuesRequest = {
              method: 'GET',
              url: BASE_URL + 'projects/' + projectId + '/issues',
              headers: {
                  'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
              }
          };

      $http(issuesRequest)
          .then(function success(response) {
              deferred.resolve(response.data);
          }, function error(err) {
              deferred.reject(err);
          });

      return deferred.promise;
  };

  function addIssueToProject(issue) {
      var deferred = $q.defer();

      var dataLabels = '';
      issue.Labels.forEach(function(l, index) {
          dataLabels += '&labels[' + index + '].Name=' + l.trim();
      });

      var issueData = 'Title=' + issue.Title +
              '&Description=' + issue.Description +
              '&DueDate=' + issue.DueDate.toLocaleString() +
              '&ProjectId=' + issue.ProjectId +
              '&AssigneeId=' + issue.AssigneeId +
              '&PriorityId=' + issue.PriorityId +
              dataLabels;

      var request = {
          method: 'POST',
          url: BASE_URL + 'issues/',
          headers: {
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: issueData
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
