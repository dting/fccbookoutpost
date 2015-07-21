'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider
      .state('browse', {
        url: '/browse',
        templateUrl: 'app/browse/browse.html',
        controller: 'BrowseCtrl',
        authenticate: true
      });
});
