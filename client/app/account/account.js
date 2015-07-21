'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'app/account/profile/profile.html',
    controller: 'ProfileCtrl',
    authenticate: true
  });
});
