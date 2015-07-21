'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: 'user'
  },
  provider: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {}
});

/**
 * Virtuals
 */
// Public profile information
UserSchema.virtual('profile').get(function() {
  return {
    name: this.name,
    role: this.role
  };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function() {
  return {
    _id: this._id,
    role: this.role
  };
});

/**
 * Validations
 */

// Validate empty email
UserSchema.path('email').validate(function(email) {
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return email.length;
}, 'Email cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({email: value}, function(err, user) {
    if (err) throw err;
    if (user) {
      if (self.id === user.id) return respond(true);
      return respond(false);
    }

    respond(true);
  });
}, 'The specified email address is already in use.');

module.exports = mongoose.model('User', UserSchema);
