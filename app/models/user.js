
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  teamname: { type: String, default: '' },
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  currentStep: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  enigms: [],
  questions: []
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
