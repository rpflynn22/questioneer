var express = require('express');
var router = express.Router();
var Answer = require('../models/AnswerModel');
var Post = require('../models/PostModel');

module.exports = function(passport) {
  /* GET an answer with an id. */
  router.get('/:id', function(req, res) {
    var query = Answer.findOne({'_id': req.param('id')});
    query.exec(function(err, answer) {
    	if (err) {
    	  res.status(500).end();
    	  return console.error(err);
    	} else if (answer) {
    	  res.status(200).json(answer);
    	} else {
    	  res.status(400).end();
    	}
    });
  });

  /* POST to add an answer. */
  router.post('/', function(req, res) {
    var post = req.body.post;
    var user = req.user;
    var answerText = req.body.answerText;
    if (user) {
      var postQuery = Post.findOne({'_id': req.param('post')});
      postQuery.exec(function(err, post) {
        if (err) {
          res.status(500).end();
          return console.error(err);
        }
        if (post) {
          answer = new Answer({post: post, user: user, answerText: answerText, date: new Date(), accepted: false});
          answer.save(function(err, saved_answer) {
            if (err) {
              res.status(500).end();
              return console.error(err);
            }
            post.answers.push(saved_answer);
            post.save(function(err) {
              if (err) {
                res.status(500);
                return console.error(err);
              }
            });
            user.answers.push(saved_answer);
            user.save(function(err) {
              if (err) {
                res.status(500).end();
                return console.error(err);
              }
            });
            res.redirect('/posts/' + post._id.toString());
            return console.log("Answer saved!");
          });
        }
      });
    }
  });

  /* PUT to change an answer to a question. */
  router.put('/:id', function(req, res) {
    var query = {'_id': req.param('id')};
    var change = {'answerText': req.param('answerText')};
    Answer.update(query, change, {}, function(err, numAffected) {
      if (err) {
        res.status(500).end();
        return console.error(err);
      }
      if (numAffected == 1) {
        res.status(200).end();
        return console.log('changed ' + numAffected.toString());
      }
    });
  });

  return router;
}
