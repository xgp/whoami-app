var express = require('express');
var router = express.Router();

/* GET js page. */
router.get('/main.js', function(req, res, next) {
  res.contentType('text/javascript');
  res.render('mainjs', { authority: process.env.ISSUER,
			 client_id: process.env.CLIENT_ID });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenId Connect Sample App' });
});

module.exports = router;
