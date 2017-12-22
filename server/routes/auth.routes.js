const express = require('express');
const Routes = express.Router();
const authController = require('../controllers/auth.controller');

Routes.post('/signup', authController.signUp);

Routes.post('/login', authController.login);

Routes.post('/edit/:id', authController.editUserById);

Routes.get('/logout', authController.logout);

Routes.get('/loggedin', authController.loggedIn);

module.exports = Routes;
