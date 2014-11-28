var express = require('express');
var router = express.Router();
var Post = require('../models/PostModel');

module.exports = function(passport) {  
  /* GET users listing. */
  router.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
    	if (err) {
    	  res.status(500).end();
    	  return console.error(err);
    	}
      console.log(posts);
      var data = {posts: posts};
      //res.status(200).json(data);
      res.render('posts', data);
    });
  });

  /* GET form to create a new post. */
  router.get('/new', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('create');
    } else {
      res.redirect('/');
    }
  });

  /* Post to add a post. */
  router.post('/', function(req, res) {
    var user = req.user;
    var title = req.body.title;
    var postText = req.body.postText;
    var bounty = req.body.bounty;
    if (user) {
      post = new Post({user: user, title: title, postText: postText, bounty: bounty, date: new Date()});
      post.save(function(err, this_post) {
      	if(err) {
      	  res.status(500).end();
      	  return console.error(err);
      	}
        console.log(this_post._id);
      	res.redirect('/posts/' + this_post._id.toString());
      	return console.log('post saved');
      });
    }
  });

  /* GET a post with matching id. */
  router.get('/:id', function(req, res) {
    var query = Post.findOne({'_id': req.param('id')});
    query
      .populate('user')
      .populate('answers')
      .exec(function(err, post) {
      	if (err) {
      	  res.status(500).end();
      	  return console.error(err);
      	}
      	if (post) {
          console.log(post);
          console.log(post.answers);
          res.render('post', {post: post, logged_in: req.isAuthenticated()});
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
        //res.render('user', )
    	  return console.log('changed ' + numAffected.toString());
    	}
    	res.status(500).send('Bad number of records changed: ' + numAffected.toString());
    	console.log('changed ' + numAffected.toString() + '. ');
    	return console.log('bad number of records changed');
    });
  });

  return router;
}