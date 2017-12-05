const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model.js');
const Routes = express.Router();
ObjectId = require('mongodb').ObjectID;

Routes.post('/signup', (req, res, next) => {
  console.log(req.body);
  req.body.birthday = Date.now();
  req.body.liking = ObjectId("5a26e5307f3e4d51863f726e");
  const { name,
          nickname,
          password,
          photoUrl,
          position,
          birthday,
          liking,
          facebookId,
          gender } = req.body;
  console.log(position);
  if (!name || !nickname || !password || !photoUrl || !position || !birthday || !liking || !gender) {
    console.log("FAIL");
    res.status(400).json({ message: 'Please, provide all fields' });
    return;
  }
  console.log("entrando");
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
      liking,
      password,
      gender
    });
    console.log(theUser);
    return theUser.save();
  })
  .then(newUser => {
    console.log(newUser);
    req.login(newUser, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }
      res.status(200).json(req.user);
    });
  })
  .catch(e => {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
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


module.exports = Routes;
