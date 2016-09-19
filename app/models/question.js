
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Question schema
 */

var QuestionSchema = new Schema({
  id: { type: Number, default: 0 },
  type: { type: String, default: '' },
  sentence: { type: String, default: '' },
  question: { type: String, default: '' },
  choices: [],
  answer: { type: String, default: '' },
  img: { type: String, default: '' },
  answerImg: { type: String, default: '' },
  hint: { type: String, default: '' }
});

/**
 * Methods
 */

QuestionSchema.method({
  // validate: function (cb) {
  //   return this.model('Question').find({ type: this.type }, cb);
  // }

});

/**
 * Statics
 */

QuestionSchema.static({

});

/**
 * Register
 */

mongoose.model('Question', QuestionSchema);
