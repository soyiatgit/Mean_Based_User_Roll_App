var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("/ route middleware");
   res.render('index', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
	console.log("/ new route middleware");
	console.log("new route in index")
  res.send('respond with a resource - send from index route');
});

module.exports = router;
