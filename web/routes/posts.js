var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/PostModel');
var mongoURI = process.env.QUESTIONEER_MONGO_URI;

/* GET users listing. */
router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
  	if (err) {
  	  res.status(500).end();
  	  return console.error(err);
  	}
  	res.status(200).json(posts);
  });
});

/* Post to add a post. */
router.post('/', function(req, res) {
  var user = req.body.user;
  var title = req.body.title;
  var postText = req.body.postText;
  var bounty = req.body.bounty;
  post = new Post({user: user, title: title, postText: postText, bounty: bounty, date: new Date()});
  post.save(function(err) {
  	if(err) {
  	  res.status(500).end();
  	  return console.error(err);
  	}
  	res.status(200).end();
  	return console.log('post saved');
  });
});

/* GET a post with matching id. */
router.get('/:id', function(req, res) {
  var query = Post.findOne({'_id': req.param('id')});
  query.exec(function(err, user) {
  	if (err) {
  	  res.status(500).end();
  	  return console.error(err);
  	}
  	if (user) {
  	  res.status(200).json(user);
  	} else {
  	  res.status(400).end();
  	}
  });
});

/* PUT to update a post with matching id. */
router.put('/:id', function(req, res) {
  var query = {'_id': req.param('id')};
  var change = {'user': req.param('userName'),
                'postText': req.param('postText'),
                'bounty': req.param('bounty')
               };
  Post.update(query, change, {}, function(err, numAffected) {
  	if (err) {
  	  res.status(500).end();
  	  return console.error(err);
  	}
  	if (numAffected == 1) {
  	  res.status(200).end();
  	  return console.log('changed ' + numAffected.toString());
  	}
  	res.status(500).send('Bad number of records changed: ' + numAffected.toString());
  	console.log('changed ' + numAffected.toString() + '. ');
  	return console.log('bad number of records changed');
  });
});

module.exports = router;