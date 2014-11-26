var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

var answerSchema = mongoose.Schema({
  id: ObjectId,
  post: {type: ObjectId, ref: 'Post', required: true},
  user: {type: ObjectId, ref: 'User', required: true},
  answerText: {type: String, trim: true},
  date: {type: Date},
  accepted: {type: Boolean}
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;