'use strict';

angular
  .module('issueTracking.issues')
  .directive('ngIssueFilter', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/issues/issue-filter.html'
        }
    }])
    .directive('ngIssueCommentForm', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/issues/add-comment.html'
        }
    }])
    .directive('ngIssueComments', [function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/issues/issue-comments.html'
        }
    }]);
