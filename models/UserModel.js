var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection(process.env.QUESTIONEER_MONGO_URI);
var ObjectId = Schema.ObjectId;

var userSchema = mongoose.Schema({
  id: ObjectId,
  userName: {type: String, required: true, trim: true, index: {unique: true}},
  password: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true, index: {unique: true}},
  rippleAddress: {type: String, required: true, trim: true},
  accountCredit: Number,
  date: Date
});

var User = db.model('User', userSchema);

module.exports = User;
