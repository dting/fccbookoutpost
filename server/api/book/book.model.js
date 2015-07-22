'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  poster: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  info: Object,
  active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
