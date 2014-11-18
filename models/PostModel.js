var mongoose = require('mongoose');
var schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.QUESTIONEER_MONGO_URI);
var ObjectId = schema.ObjectId;

var postSchema = mongoose.Schema({
  id: ObjectId,
  user: {type: String, required: true, trim: true},
  postText: {type: String, trim: true},
  bounty: {type: Number},
  date: {type: Date}
});

var Post = db.model('Post', postSchema);

module.exports = Post;