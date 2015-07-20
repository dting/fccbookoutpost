/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a'
  }, {
    name: 'Smart Build System',
    info: 'Build system'
  }, {
    name: 'Modular Structure',
    info: 'Best practice'
  }, {
    name: 'Optimized Build',
    info: 'Build process'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});
