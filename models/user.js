var mongoose = require('mongoose');
mongoose.connect('mongodb://questioneer-dev:yogurt-buddy@linus.mongohq.com:10011/questioneer-master');

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
