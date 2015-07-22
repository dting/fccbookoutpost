'use strict';

angular.module('fccbookoutpostApp').config(function($stateProvider) {
  $stateProvider.state('book', {
    url: '/book/:id',
    templateUrl: 'app/book/book.html',
    controller: 'BookCtrl',
    authenticate: true
  });
});
