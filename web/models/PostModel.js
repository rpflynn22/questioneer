var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

var postSchema = schema({
  id: ObjectId,
  user: {type: ObjectId, ref: 'User', required: true},
  title: {type: String, trim: true, required: true},
  postText: {type: String, trim: true, required: true},
  bounty: {type: Number, required: true},
  answers: [{type: ObjectId, ref: 'Answer'}],
  answered: {type: Boolean, required: true},
  date: {type: Date}
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
