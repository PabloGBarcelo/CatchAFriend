module.exports = (app) => {
  const auth = require('../routes/auth.routes');
  const chat = require('../routes/chat.routes');
  const plan = require('../routes/plan.routes');
  const fblogin = require('../routes/authfb.routes');
  const categories = require('../routes/categories.routes');

  app.use('/api', auth);
  app.use('/api', categories);
  app.use('/api', chat);
  app.use('/api', plan);
  app.use('/', fblogin);
};
