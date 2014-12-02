var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');
var requre = require('request');

var RIPPLE_API_ROOT = "https://api.ripple.com";
var QUESTIONEER_RIPPLE_ADDRESS = "rHAhmDMyZRsUTZNXeNbT98LRx15x92YfqQ";
var QUESTIONEER_RIPPLE_SECRET = "snX5RuM911ht6x3dEdNN9dGqE3KZQ";

module.exports = function(passport) {
  /* GET users listing. */
  router.get('/', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.status(500).end();
        return console.error(err);
      }
      res.status(200).json(users);
      console.log(req.isAuthenticated().toString());
    });
  });

  /*
    POST to add users.
    Note that req.body... only works with POST type x-www-form-urlencoded.
  */
  router.post('/', function(req, res) {
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;
    var rippleAddress = req.body.rippleAddress;
    var accountCredit = 0;
    console.log('HERE');
    user = new User({userName: userName, email: email, password: password, rippleAddress: rippleAddress, accountCredit: accountCredit, date: new Date()});
    user.save(function(err) {
      if (err) {
        res.status(409).end();
        return console.error(err);
      }
      res.status(200).end();
      return console.log('saved');
    });
  });

  /* GET user with particular username. */
  router.get('/:userName', function(req, res) {
    var query = User.findOne({'userName': req.param('userName')});
    query.exec(function(err, user) {
      if (err) return console.error(err);
      if (user) {
        //res.status(200).json(user);
        console.log(user);
        res.render('user', {user: user, current_user_logged_in: req.user});
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

  router.post('/cash-out', function(req, res) {
    var user = req.user;
    if (user && user.accountCredit > 0) {
      var credit = user.accountCredit;
      user.accountCredit = 0;
      user.save(function(err) {
        if (err) {
          res.status(500).end();
          return console.error(err);
        }

        console.log(user.userName + '\'s account emptied. Transfer ' + credit.toString() + ' XRP to user\'s ripple account.');

        var preparePaymentURL = RIPPLE_API_ROOT + '/v1/accounts/' +
            QUESTIONEER_RIPPLE_ADDRESS +
            '/payments/paths/' +
            user.rippleAddress + '/' +
            credit;

        // Submit request to prepare payment
        request(preparePaymentURL, function (err, res, body) {
          var data = JSON.parse(body),
              payment = data.payments[0];

          // Submit request for UUID for submitting payment
          request(RIPPLE_API_ROOT + '/v1/uuid', function(err, res, body) {
            if (!err && res.statusCode == 200) {
              var data = JSON.parse(body),
                  uuid = data.uuid;

              // Now submit the payment to the Ripple network
              var submitPaymentURL = RIPPLE_API_ROOT + '/v1/accounts/' +
                  QUESTIONEER_RIPPLE_ADDRESS +
                  '/payments';

              var submitPaymentBody = {
                "payment": payment,
                "client_resource_id": uuid,
                "secret": QUESTIONEER_RIPPLE_SECRET
              };

              request.post({
                url: submitPaymentURL,
                body: submitPaymentBody,
                json: true
              }, function (err, res, body) {
                // Body already parsed
                if (body.success) {
                  console.log("Success!");
                }
              });
            }
          });
        });

        res.redirect('/users/' + user.userName);
      });
    }
  });

  return router;
}
