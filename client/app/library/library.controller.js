'use strict';

var app = angular.module('fccbookoutpostApp');

app.controller('LibraryCtrl', function($scope, Book, Auth) {
  $scope.book = {};
  $scope.wishList = angular.copy(Auth.getCurrentUser().wishList);

  console.log($scope.wishList);
  Book.userLibrary({id: Auth.getCurrentUser()._id})
      .$promise.then(function(results) {
        $scope.library = results;
      });

  $scope.query = function() {
    $scope.pending = true;
    if (!$scope.book.query) {
      $scope.queryResults = null;
      $scope.pending = false;
      return;
    }

    Book.query($scope.book).$promise.then(function(results) {
      console.log(results);
      $scope.pending = false;
      $scope.queryResults = results;
    });
  };

  $scope.addToLibrary = function(book) {
    $scope.pending = true;
    Book.addToLibrary(book).$promise.then(function(result) {
      $scope.library.push(result);
      $scope.pending = false;
    });
  };

  $scope.removeFromLibrary = function(book) {
    $scope.pending = true;
    Book.removeFromLibrary(book).$promise.then(function(result) {
      _.pull($scope.library, book);
      $scope.pending = false;
    });
  };

  $scope.addToWishList = function(book) {
    $scope.pending = true;
    Book.addToWishList(book).$promise.then(function(result) {
      $scope.wishList.push(result);
      $scope.pending = false;
    });
  };

  $scope.removeFromWishList = function(book) {
    $scope.pending = true;
    Book.removeFromWishList(book).$promise.then(function(result) {
      _.remove($scope.wishList, {id: result.id});
      $scope.pending = false;
    });
  };

  $scope.cancel = function() {
    $scope.book.query = '';
    $scope.queryResults = null;
  };
});
