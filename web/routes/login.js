var express = require('express');
var router = express.Router();
var mongoURI = process.env.QUESTIONEER_MONGO_URI;

/* POST allowing a user to log in. */
router.post('/',
  passport.authenticate('local', {successRedirect: '/',
                                  failureRedirect: '/login',
                                  failureFlash: true})
);