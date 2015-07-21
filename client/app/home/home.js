'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home', templateUrl: 'app/home/home.html', abstract: true
  }).state('home.dashboard', {
    url: '', templateUrl: 'app/home/dashboard.html', controller: 'DashCtrl'
  });
});
