var express = require('express');
var router = express.Router();
var mongoURI = process.env.QUESTIONEER_MONGO_URI;
var mongoose = require('mongoose');
mongoose.connect()

/* GET users listing. */
router.get('/', function(req, res) {
  
  res.send('respond with a resource');
});

module.exports = router;
