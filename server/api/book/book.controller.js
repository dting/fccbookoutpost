'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var User = require('../user/user.model');
var booksearch = require('google-books-search');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Query Google books.
exports.query = function(req, res) {
  booksearch.search(req.params.query, {limit: 5}, function(error, results) {
    if (!error) {
      return res.status(200).json(results);
    } else {
      console.log(error);
    }
  });
};

// Get list of books for a user.
exports.userLibrary = function(req, res) {
  Book.find({poster: req.user}, function(err, books) {
    if (err) return handleError(res, err);
    console.log(books);
    return res.status(200).json(books);
  });
};

// Get list of books
exports.index = function(req, res) {
  Book.find(function(err, books) {
    if (err) return handleError(res, err);
    return res.status(200).json(books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id).populate('poster').exec(function(err, book) {
    if (err) return handleError(res, err);
    if (!book) return res.status(404).send('Not Found');
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  booksearch.search(req.body.id, {limit: 1}, function(error, results) {
    if (error) return handleError(res, error);
    if (results.length !== 1) return res.status(404).send('Book Not Found');
    Book.create({
      poster: req.user,
      info: results[0]
    }, function(err, book) {
      if (err) return handleError(res, err);
      return res.status(201).json(book);
    });
  });
};

// Add book to user wish list.
exports.addToWishList = function(req, res) {
  booksearch.search(req.body.id, {limit: 1}, function(error, results) {
    if (error) return handleError(res, error);
    if (results.length !== 1) return res.status(404).send('Book Not Found');
    req.user.wishList.push(results[0]);
    req.user.save(function(err) {
      if (err) return handleError(res, err);
      return res.status(201).json(results[0]);
    });
  });
};

// Remove book from user wish list.
exports.removeFromWishList = function(req, res) {
  var removedBook = _.find(req.user.wishList, {id: req.params.bookId});
  req.user.wishList.pull(removedBook);
  req.user.save(function(err) {
    if (err) return handleError(res, err);
    return res.status(201).json(removedBook);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if (req.body._id) delete req.body._id;
  Book.findById(req.params.id, function(err, book) {
    if (err) return handleError(res, err);
    if (!book) return res.status(404).send('Not Found');
    var updated = _.merge(book, req.body);
    updated.save(function(err) {
      if (err) return handleError(res, err);
      return res.status(200).json(book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    if (err) { return handleError(res, err); }
    if (!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
