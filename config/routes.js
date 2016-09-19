'use strict';

/**
 * Module dependencies.
 */

const users = require('../app/controllers/users');
const home = require('../app/controllers/home');
const main = require('../app/controllers/main');
const auth = require('./middlewares/authorization');

/**
 * Expose
 */

module.exports = function (app, passport) {

  const pauth = passport.authenticate.bind(passport);

  // user routes
  app.get('/', auth.requiresLogin, home.index);
  app.get('/end', auth.requiresLogin, home.end);
  app.get('/qr', auth.requiresLogin, home.qr);
  app.get('/etape/:id', auth.requiresLogin, main.enigm);
  app.get('/question/:id', auth.requiresLogin, main.question);
  app.post('/code/:id', auth.requiresLogin, users.code);

  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    pauth('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  app.get('/users/etape/:hash', auth.requiresLogin, users.enigm);
  app.post('/users/question/:id', auth.requiresLogin, users.question);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
