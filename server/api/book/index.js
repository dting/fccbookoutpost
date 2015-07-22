'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/query/:query', auth.isAuthenticated(), controller.query);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/library/:id', auth.isAuthenticated(), controller.userLibrary);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/wishList', auth.isAuthenticated(), controller.addToWishList);
router.delete('/wishList/:bookId', auth.isAuthenticated(),
    controller.removeFromWishList);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
