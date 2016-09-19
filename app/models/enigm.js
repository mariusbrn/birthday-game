
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Enigm schema
 */

var EnigmSchema = new Schema({
  id: { type: Number, default: 0 },
  code: { type: String, default: '' },
  hash: { type: String, default: '' }
});

/**
 * Methods
 */

EnigmSchema.method({
  // validate: function (cb) {
  //   return this.model('Enigm').find({ type: this.type }, cb);
  // }

});

/**
 * Statics
 */

EnigmSchema.static({

});

/**
 * Register
 */

mongoose.model('Enigm', EnigmSchema);
