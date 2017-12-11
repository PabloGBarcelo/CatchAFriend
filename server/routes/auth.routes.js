const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const Routes = express.Router();
ObjectId = require('mongodb').ObjectID;

Routes.post('/signup', (req, res, next) => { // CHECKED
  console.log("REQ BODY");
  console.log(req.body);
  /* TEMPORAL */
  req.body.liking = { categorie:ObjectId("5a2724a12b10285813df3339"), rate:1};
  /* REMOVE WHEN HAVE FRONT */
  const { name,
          nickname,
          password,
          photoUrl,
          position,
          birthday,
          facebookId,
          email,
          gender } = req.body;
  if (!name || !nickname || !password || !gender) {
    res.status(400).json({ message: 'Please, provide all fields' });
    return;
  }
  User.findOne({ email }, '_id')
  .then(user => {
    if (user) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }
    console.log("password");
    console.log(password);
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    console.log(hashPass);
    const theUser = new User({
      name,
      nickname,
      password: hashPass,
      photoUrl,
      position,
      birthday,
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
      res.status(500).json(console.log(e));
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

Routes.post('/edit/:id', (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id,req.body)
      .then((result) => res.status(200).json({ message: 'Success' }))
      .catch((error) => {
          console.log(error);
          res.status(500).json({ message: error });
        });
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

module.exports = Routes;
