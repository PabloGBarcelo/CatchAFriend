const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const Routes = express.Router();
ObjectId = require('mongodb').ObjectID;

Routes.post('/signup', (req, res, next) => { // CHECKED
  console.log(req.body);
  /* TEMPORAL */
  req.body.birthday = Date.now();
  req.body.liking = { categorie:ObjectId("5a26e5307f3e4d51863f726e"), rate:1};
  /* REMOVE WHEN HAVE FRONT */
  const { name,
          nickname,
          password,
          photoUrl,
          position,
          birthday,
          liking,
          facebookId,
          email,
          gender } = req.body;
  if (!name || !nickname || !password || !photoUrl || !position || !birthday || !liking || !gender) {
    res.status(400).json({ message: 'Please, provide all fields' });
    return;
  }
  User.findOne({ name }, '_id')
  .then(user => {
    if (user) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const theUser = new User({
      name,
      nickname,
      password: hashPass,
      photoUrl,
      position,
      birthday,
      _liking:liking,
      password,
      gender,
      email
    });
    console.log(theUser);
    return theUser.save();
  })
  .then(newUser => {
    req.login(newUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }
      res.status(200).json(req.user);
    });
  })
  .catch(e => {
      res.status(500).json({ message: e });
  });
});


Routes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

Routes.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});


Routes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

// Facebook auth routes
Routes.get('/auth/facebook', function authenticateFacebook (req, res, next) {
  req.session.returnTo = '/#' + req.query.returnTo;
  next ();
},
passport.authenticate ('facebook'));

Routes.get('/auth/facebook/callback', function (req, res, next) {
 var authenticator = passport.authenticate ('facebook', {
   successRedirect: req.session.returnTo,
   failureRedirect: '/'
  });

  delete req.session.returnTo;
  authenticator (req, res, next);
});

module.exports = Routes;
