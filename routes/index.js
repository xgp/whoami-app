var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenId Connect Sample App' });
});

/* GET js page. */
router.get('/main.js', function(req, res, next) {
  res.contentType('text/javascript');
  res.render('main', { authority: process.env.ISSUER,
			 client_id: process.env.CLIENT_ID });
});

module.exports = router;
