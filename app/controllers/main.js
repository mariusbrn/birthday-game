
/*!
 * Module dependencies.
 */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const _ = require('lodash');
const { respond } = require('../utils');
const Question = mongoose.model('Question');

exports.enigm = function (req, res) {
	const id = parseInt(req.params.id, 10);
  const user = req.user;

  if (user.currentStep !== id) {
    return respond(res, 'home/empty', { 
      errors : ['Ce n\'est pas la bonne etape'] 
    }, 200);
  }

  if (user.enigms.length === id) {
    res.redirect('/end');
  }

  const enigmIdForUser = user.enigms[req.user.currentStep].id;
  res.render('enigms/' + enigmIdForUser, {
    title: 'Enigme ' + id,
    id
  });
};

exports.question = async(function* (req, res) {
  const questionId = req.params.id;
  const user = req.user;

  try {
    const question = yield Question.findOne({ id: questionId });
    let resObj = {};
    if (!question)  {
      return respond(res, null, resObj, 404);
    }

    res.render('questions/' + question.type, {
      title: 'Question ' + questionId,
      question
    });
  } catch (err) {
    console.log(err)
    respond(res, null, {
      errors: ['Error'],
      user
    }, 500);
  }
});
