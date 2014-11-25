var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Answer = require('../models/AnswerModel');
var mongoURI = process.env.QUESTIONEER_MONGO_URI;

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
  var user = req.body.user;
  var answerText = req.body.answerText;
  answer = new Answer({post: post, user: user, answerText: answerText, date: new Date(), accepted: false});
  answer.save(function(err) {
  	if (err) {
  	  res.status(500).end();
  	  return console.error(err);
  	}
  	res.status(200).end();
  	return console.log("Answer saved!");
  });
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

module.exports = router;