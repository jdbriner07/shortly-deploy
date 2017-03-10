var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

var linkSchema = mongoose.Schema({
  url: String,
  base_url: String,
  link: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;



  