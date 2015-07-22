'use strict';

angular.module('fccbookoutpostApp').controller('BrowseCtrl',
    function($scope, Book) {
      Book.index().$promise.then(function(books) {
        $scope.books = books;
      });
    });
