var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String
});

userSchema.pre('save', function(next) {
  // console.log('hi');
  // bcrypt.hash(this.password, null, null, function(err, hash) {
  //   console.log(err);
  //   console.log(hash);
  //   this.password = hash;
  // }.bind(this));
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
  // next();
});

var User = mongoose.model('User', userSchema);

User.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};


module.exports = User;

