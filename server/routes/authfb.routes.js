require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const Routes = express.Router();

Routes.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

Routes.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: process.env.SUCCESSREDIRECT,
                                      failureRedirect: process.env.FAILUREREDIRECT }));

module.exports = Routes;
