const passport = require('passport');

require('./serializers');
require('./localStrategy');
require ('./FacebookStrategy');
require ('./oauth');
module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
};
