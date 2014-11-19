var mongoose = require('mongoose');
var schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.QUESTIONEER_MONGO_URI);
var ObjectId = schema.ObjectId;
var validate = require('mongoose-validator').validate;

var postSchema = mongoose.Schema({
  id: ObjectId,
  user: {type: ObjectId, ref: 'User'},
  title: {type: String, trim: true, required: true, validate: validate('len', 0, 128)}
  postText: {type: String, trim: true},
  bounty: {type: Number},
  date: {type: Date}
});

var Post = db.model('Post', postSchema);

module.exports = Post;
