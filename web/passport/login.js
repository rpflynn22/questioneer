var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.use('login', new LocalStrategy({
  	passReqToCallback: true
  },
  function(req, username, password, done) {
  	User.findOne({'userName': username},
  	  function(err, user) {
  	  	if (err) {
  	  	  return done(err);
  	  	}
  	  	if (!user) {
  	  	  console.log('User not found with username ' + username);
  	  	  return done(null, false, req.flash('message', 'User not found.'));
  	  	}
  	  	if (!isValidPasssword(user, password)) {
  	  	  console.log('Invalid Password');
  	  	  return done(null, false, req.flash('message', 'Invalid Password'));
  	  	}
        console.log('User found.');
  	  	return done(null, user);
  	  }
  	);
  }));

  var isValidPasssword = function(user, password) {
  	return bCrypt.compareSync(password, user.password);
  }
}