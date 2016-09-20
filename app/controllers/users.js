'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose').set('debug', true);
const { wrap: async } = require('co');
const _ = require('lodash');
const { respond } = require('../utils');
const User = mongoose.model('User');
const Enigm = mongoose.model('Enigm');
const Question = mongoose.model('Question');

/**
 * Load
 */

exports.load = async(function* (req, res, next, _id) {
  const criteria = { _id };
  try {
    req.profile = yield User.load({ criteria });
    if (!req.profile) return next(new Error('User not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * Create user
 */

exports.create = async(function* (req, res) {
  let steps = req.body.steps.split(',');
  req.body.steps = steps.map((s) => parseInt(s, 10));
   
  const user = new User(req.body);
  user.provider = 'local';

  try {
    yield user.save();
    req.logIn(user, err => {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.redirect('/');
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    res.render('users/signup', {
      title: 'Sign up',
      errors,
      user
    });
  }
});

/**
 * Update user
 */

// exports.update = async(function* (req, res){
//   const user = req.user;
//   assign(user, only(req.body, 'teamname currentStep points'));
//   try {
//     yield user.save(user);
//     respond(res, 'user/edit', {
//       title: 'Edit ' + user.name,
//       user
//     }, 200);
//   } catch (err) {
//     respond(res, 'user/edit', {
//       title: 'Edit ' + article.name,
//       errors: ['Error'],
//       user
//     }, 422);
//   }
// });

/**
 * Find all users
 */

exports.findAll = async(function* (req, res){
  const user = req.user;
  try {
    
    let users = yield User.find( {}, { name: 1, teamname: 1, points: 1, enigms: 1, _id: 0 });
    _.remove(users, { name: 'admin' });
    users.forEach(function (user) {
      let enigmDone = _.filter(user.enigms, { done: true });
      console.log((user.enigms.length / 100) * enigmDone.length, Math.round((user.enigms.length / 100) * enigmDone.length));
      user.progress = Math.round((100 / user.enigms.length) * enigmDone.length);
    });

    let resObj = {
      teams: users,
      success: true,
      user
    };

    respond(res, null, resObj, 200);
  } catch (err) {
    console.log(err);
    respond(res, null, {
      errors: ['Error'],
      user
    }, 422);
  }
});

/**
 * Answer enigm
 */

exports.enigm = async(function* (req, res){
  const user = req.user;
  const hash = req.params.hash;

  try {
    const enigm = yield Enigm.findOne({ hash: hash });
    let resObj = { user: user };
    if (!enigm)  {
      return respond(res, null, resObj, 404);
    }

    const step = enigm.id; 
    let enigmIndex = _.findIndex(user.enigms, { id: enigm.id });

    if (step < user.currentStep) {
      resObj.errors = ['Etape déjà enregistrée'];
      return respond(res, 'home/empty', resObj, 200);
    }

    if (step > user.currentStep) {
      resObj.errors = ['Ce n\'est pas la bonne etape'];
      return respond(res, 'home/empty', resObj, 200);
    }

    let nextQuestion = user.questions[user.currentStep];
    user.currentStep++;

    let userEnigm = user.enigms[enigmIndex];
    userEnigm.done = true;
    userEnigm.date = new Date();
    user.enigms[enigmIndex] = userEnigm;
    user.markModified('enigms');

    try {
      yield user.save(user);

      respond(res, 'home/congrats', {
        title: 'Félicitation !! ',
        next: nextQuestion,
        user
      }, 200);
    } catch (err) {
      respond(res, null, {
        errors: ['Error'],
        user
      }, 422);
    }  
  } catch (err) {
    respond(res, null, {
      errors: ['Error'],
      user
    }, 500);
  }    
});

/**
 * Answer question
 */

exports.question = async(function* (req, res){
  const user = req.user;
  const questionId = parseInt(req.params.id);

  try {
    const question = yield Question.findOne({ id: questionId });
    let resObj = {};
    if (!question)  {
      return respond(res, null, resObj, 404);
    }

    resObj.user = user;

    let answer = req.body.answer;
    answer = answer.toLowerCase();

    let questionIndex = _.findIndex(user.questions, { id: questionId });
    let userQuestion = user.questions[questionIndex];

    if (userQuestion.done) {
      resObj.success = true;
    } else if (question.answer === answer) {
      let coeff = 5 - userQuestion.attempt;
      if (coeff < 0) coeff = 0; 
      let points = 10 * coeff;
      user.points += points;
      userQuestion.done = true; 
      userQuestion.date = new Date();     
      resObj.success = true;
      resObj.next = user.currentStep;
    } else {
      userQuestion.attempt++;
      resObj.failed = true;
      resObj.attempt = userQuestion.attempt;
    }

    user.questions[questionIndex] = userQuestion;
    user.markModified('questions');

    try {
      yield user.save(user);
      respond(res, null, resObj, 200);
    } catch (err) {
      console.log(err);
      respond(res, null, {
        errors: ['Error'],
        user
      }, 422);
    }
  } catch (err) {
    console.log(err);
    respond(res, null, {
      errors: ['Error'],
      user
    }, 500);
  }
});

/**
 * Check code for enigm
 */

exports.code = async(function* (req, res) {

  const user = req.user;
  const enigmId = parseInt(req.params.id);
  const code = req.body.code;

  try {
    const enigm = yield Enigm.findOne({ id: enigmId });
    let resObj = {};
    if (!enigm)  {
      return respond(res, null, resObj, 404);
    }

    if (enigm.code === code) {
      resObj.success = true;
      resObj.hash = enigm.hash;
    } else {
      resObj.failed = true;
    }
    
    respond(res, null, resObj, 200);

  } catch (err) {
    console.log(err);
    respond(res, null, {
      errors: ['Error'],
      user
    }, 500);
  }
});


/**
 *  Show profile
 */

exports.show = function (req, res) {
  const user = req.profile;
  respond(res, 'users/show', {
    title: user.name,
    user: user
  });
};

exports.signin = function () {};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    login: true
  });
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
