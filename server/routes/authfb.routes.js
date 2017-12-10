const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const Routes = express.Router();

// Facebook auth routes
Routes.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

Routes.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:4200/welcome',
                                      failureRedirect: 'http://localhost:4200/' }));

module.exports = Routes;
