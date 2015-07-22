'use strict';

angular.module('fccbookoutpostApp').factory('Book', function($resource) {
  var queryResourceService = $resource('/api/books/query/:query', {
    query: '@query'
  });
  var bookResourceService = $resource('/api/books/:id');
  var wishListResourceService = $resource('/api/books/wishList/:bookId');
  var libraryResourceService = $resource('/api/books/library/:id', {
    id: '@_id'
  });

  return {
    index: function() {
      return bookResourceService.query();
    },

    getBook: function(book) {
      return bookResourceService.get(book);
    },

    query: function(query) {
      return queryResourceService.query(query);
    },

    addToLibrary: function(book) {
      return bookResourceService.save(book);
    },

    removeFromLibrary: function(book) {
      console.log(book);
      return bookResourceService.delete({id: book._id});
    },

    addToWishList: function(book) {
      return wishListResourceService.save(book);
    },

    removeFromWishList: function(book) {
      return wishListResourceService.delete({bookId: book.id});
    },

    userLibrary: function(user) {
      return libraryResourceService.query(user);
    }
  };
});
