'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider.state('library', {
    url: '/library',
    templateUrl: 'app/library/library.html',
    controller: 'LibraryCtrl',
    authenticate: true
  });
});
