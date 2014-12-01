var express = require('express');
var router = express.Router();
var Post = require('../models/PostModel');
var Answer = require('../models/AnswerModel');
var User = require('../models/UserModel');

module.exports = function(passport) {  
  /* GET users listing. */
  router.get('/', function(req, res) {
    var query = Post.find({});
    query
      .populate('user')
      .exec(function(err, posts) {
        if (err) {
          res.status(500).end();
          return console.error(err);
        }
        console.log(posts);
        var data = {posts: posts, current_user_logged_in: req.user};
        res.render('posts', data);
      });
  });

  /* GET form to create a new post. */
  router.get('/new', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('create', {current_user_logged_in: req.user});
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
    if (user && user.accountCredit >= bounty) {
      post = new Post({user: user, title: title, postText: postText, bounty: bounty, answered: false, date: new Date()});
      post.save(function(err, this_post) {
      	if (err) {
      	  res.status(500).end();
      	  return console.error(err);
      	}
        user.posts.push(this_post);
        user.accountCredit -= bounty;
        user.save(function(err) {
          if (err) {
            res.status(500).end();
            return console.error(err);
          }
          res.redirect('/posts/' + this_post._id.toString());
          return console.log('post saved');
        });
      });
    } else if (user && user.accountCredit < bounty) {
      res.redirect('/posts/new');
    }
  });

  /* GET a post with matching id. */
  router.get('/:id', function(req, res) {
    var query = Post.findOne({'_id': req.param('id')});
    query
      .lean ()
      .populate('user')
      .populate('answers')
      .exec(function(err, post) {
      	if (err) {
      	  res.status(500).end();
          console.log(post.answers);
      	  return console.error(err);
      	}
        var options = {
          path: 'answers.user',
          model: 'User'
        }
      	if (post) {
          //console.log(post);
          //console.log(post.answers);
          Post.populate(post, options, function(err, answers) {
            res.render('post', {post: post, logged_in: req.isAuthenticated(), answers: answers.answers, current_user_logged_in: req.user});
          });
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

  /* POST to accept an answer for a question. */
  router.post('/:id/accept-answer/:answer_id', function(req, res) {
    var postId = req.param('id');
    var answerId = req.param('answer_id');
    var userGettingCredit = req.body.user_receiving_credit;
    var postQuery = Post.findOne({'_id': postId});
    postQuery
      .populate('user')
      .exec(function(err, post) {
        console.log('here1');
        if (err) {
          res.status(500).end();
          return console.error(err);
        }
        if (post && post.user.userName == req.user.userName) {
          console.log('here2');
          var answerQuery = Answer.findOne({'_id': answerId});
          answerQuery.exec(function(err, answer) {
            
            if (err) {
              res.status(500).end();
              return console.error(err);
            }
            answer.accepted = true;
            answer.save(function(err) {
              console.log('here3');
              if (err) {
                res.status(500).end();
                return console.error(err);
              }
              console.log('Accepted answer saved!');
            });
            var bounty = post.bounty;
            post.answered = true;
            post.save(function(err) {
              console.log('here4');
              if (err) {
                res.status(500).end();
                return console.error(err);
              }
              console.log('Post updated as answered!');
              var userQuery = {'userName': userGettingCredit};
              var update = {$inc: {accountCredit: bounty}};
              var options = {multi: false};
              User.update(userQuery, update, options, function(err, numAffected) {
                console.log('here5');
                if (err) {
                  res.status(500).end();
                  return console.error(err);
                }
                console.log('Bounty updated!');
                res.redirect('/posts/' + postId);
              });
            });
          });
        } else {
          res.send("Fuck you").end();
        }
      });
  });

  /* DELETE a post if the user deleting it is the user that created it
     and there are no answers. */
  router.delete('/:id', function(req, res) {
    var postId = req.param('id');
    var postQuery = Post.findOne({'_id': postId, 'answers': []});
    var user = req.user;
    postQuery
      .populate('user')
      .exec(function(err, post) {
        if (err) {
          res.status(500);
          return console.error(err);
        }
        if (post && post.user.userName == req.user.userName) {
          var bounty = post.bounty;
          post.remove(function(err) {
            if (err) {
              res.status(500).end();
              return console.error(err);
            }
            user.accountCredit += bounty;
            user.save(function(err) {
              if (err) {
                res.status(500).end();
                return console.error(err);
              }
              console.log('Post removed and user\'s account refunded!');
              res.redirect('/posts');
            });
          });
        }
      });
  });

  return router;
}