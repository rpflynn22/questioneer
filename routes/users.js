var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/UserModel');
var mongoURI = process.env.QUESTIONEER_MONGO_URI;

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
  	res.status(200).json(users);
  });
});

/* 
  POST to add users.
  Note that req.body... only works with POST type x-www-form-urlencoded.
*/
router.post('/', function(req, res) {
  var userName = req.body.userName;
  var email = req.body.email;
  var rippleAddress = req.body.rippleAddress;
  user = new User({userName: userName, email: email, rippleAddress: rippleAddress, accountCredit: 0, date: new Date()});
  user.save(function(err) {
    if (err) {
      res.status(409).end();
      return console.error(err);
    }
    res.status(200).end();
    return console.log('saved');
  });
});

/* GET user with particular id. */
router.get('/:userName', function(req, res) {
  var query = User.findOne({'userName': req.param('userName')});
  query.exec(function(err, user) {
    if (err) return console.error(err);
    if (user) {
      res.status(200).json(user);
    } else {
      res.send(400).end();
    }
  });
});

/* PUT to update a user's info. */
router.put('/:id', function(req, res) {
  var query = {'_id': req.param('id')};
  var change = {'userName': req.param('userName'),
                'email': req.param('email'),
                'rippleAddress': req.param('rippleAddress'),
               };
  User.update(query, change, {}, function(err, numAffected) {
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    res.status(200).end();
    return console.log('changed ' + numAffected.toString())
  });
});

module.exports = router;
