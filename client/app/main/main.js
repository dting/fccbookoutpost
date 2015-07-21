'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
});
