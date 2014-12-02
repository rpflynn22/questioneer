var mongoose = require('mongoose');
var schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.QUESTIONEER_MONGO_URI);
var ObjectId = schema.ObjectId;

var answerSchema = mongoose.Schema({
  id: ObjectId,
  postId: {type: ObjectId, ref: 'Post'},
  user: {type: String, required: true, trim: true},
  answerText: {type: String, trim: true},
  date: {type: Date},
  accepted: {type: Boolean}
});

var Answer = db.model('Answer', answerSchema);

module.exports = Answer;