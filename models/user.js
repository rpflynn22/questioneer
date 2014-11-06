var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  var userSchema = mongoose.Schema({
    userName: String,
    rippleAddress: String,
    dateCreated: String,
    accountCredit: Number
  });
});
