'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function(User) {
  passport.use(new LocalStrategy({
    // this is the virtual field on the model
    usernameField: 'email', passwordField: 'password'

  }, function(email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {message: 'This email is not registered.'});
      }
      if (!user.authenticate(password)) {
        return done(null, false, {message: 'This password is not correct.'});
      }
      return done(null, user);
    });
  }));
};
