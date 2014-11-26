var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

var userSchema = schema({
  id: ObjectId,
  userName: {type: String, required: true, trim: true, index: {unique: true}},
  password: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, index: {unique: true}},
  rippleAddress: {type: String, required: true, trim: true},
  accountCredit: Number,
  posts: [{type: ObjectId, ref: 'Post'}],
  date: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
