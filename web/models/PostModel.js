var mongoose = require('mongoose');
var schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.QUESTIONEER_MONGO_URI);
var ObjectId = schema.ObjectId;

var postSchema = mongoose.Schema({
  id: ObjectId,
  user: {type: ObjectId, ref: 'User'},
  title: {type: String, trim: true, required: true},
  postText: {type: String, trim: true, required: true},
  bounty: {type: Number, required: true},
  date: {type: Date}
});

var Post = db.model('Post', postSchema);

module.exports = Post;
