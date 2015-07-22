'use strict';

angular.module('fccbookoutpostApp').controller('BookCtrl',
    function($scope, $stateParams, Book, $state) {
      if (!$stateParams.id) $state.go('browse');
      Book.getBook({id: $stateParams.id}).$promise.then(function(book) {
        console.log(book);
        $scope.book = book;
      });
    });
