const passport = require('passport');
const User          = require('../models/User.model');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth       = require('./oauth');


// Facebook strategy
passport.use(new FacebookStrategy({

   // pull in our app id and secret from our auth.js file
   clientID        : configAuth.facebookAuth.clientID,
   clientSecret    : configAuth.facebookAuth.clientSecret,
   callbackURL     : configAuth.facebookAuth.callbackURL,
   profileFields: ['id', 'displayName', 'name', 'gender', 'photos','email']

},

// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
   // asynchronous
   process.nextTick(function() {

       // find the user in the database based on their facebook id
       User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

           // if there is an error, stop everything and return that
           // ie an error connecting to the database
           if (err)
               return done(err);

           // if the user is found, then log them in
           if (user) {
               return done(null, user); // user found, return that user
           } else {
               // if there is no user found with that facebook id, create them
               var newUser            = new User();
               // set all of the facebook information in our user model
               newUser.name = profile.displayName;
               newUser.nickname = profile.displayName;
               newUser.photoUrl = profile.photos[0].value;
               newUser.gender = profile.gender;
               newUser.email = profile.emails[0].value;
               newUser.facebook.id    = profile.id; // set the users facebook id
               newUser.facebook.token = token; // we will save the token that facebook provides to the user
               newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
               newUser.role = "particular";
               newUser._liking = [{ categorie:ObjectId("5a2724a12b10285813df3339"), rate:1}];
               //save our user to the database
               newUser.save(function(err) {
                   if (err)
                       throw err;
                   // if successful, return the new user
                   return done(null, newUser);
               });
           }

       });
   });

}));
