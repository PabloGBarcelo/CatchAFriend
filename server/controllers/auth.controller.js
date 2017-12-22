const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

module.exports.signUp = (req, res, next) => { // CHECKED

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
   const salt     = bcrypt.genSaltSync(10);
   const hashPass = bcrypt.hashSync(password, salt);
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
};

module.exports.login = (req, res, next) => {
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
};

module.exports.editUserById = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id,req.body)
      .then((result) => res.status(200).json({ message: 'Success' }))
      .catch((error) => {
          res.status(500).json({ message: error });
        });
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
};

module.exports.loggedIn = (req, res, next) => {
  console.log("checking loggedIn");
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
};
