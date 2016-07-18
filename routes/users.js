var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var UserUtils = require('../utils/userUtils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  res.send('respond with a new resource');
});



router.get('/List', function(req, res, next){
	console.log("reached the user route");
	var userList = UserUtils.list();
	userList.then(function(data) {
		res.send(data);
	});
});

router.post('/add', function(req, res, next){
	console.log("reached the add user route");
	
	var cell = Number(req.body.cell);
	req.body.cell = cell;
	var user =  new UserModel(req.body);
	user.save(function(err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is saved");
	});
});

router.delete('/delete/:userId', function(req, res, next){
	console.log("reached the delete user route");
	console.log(req.params.userId);
	UserModel.remove({_id: req.params.userId},function( err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is removed");
	});
});


router.put('/update', function(req, res, next){
	console.log("reached the delete user route");
	console.log(req.params.userId);
	UserModel.findOneAndUpdate({_id: req.body._id}, req.body,function( err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is updatedd");
	});
	
});

router.post('/find', function(req, res, next){
	console.log("reached the find route");
	var user =  new UserModel(req.body);
	var userList = UserUtils.find(user);
	userList.then(function(data) {
		res.send(data);
	});
});

router.get('/search/:user', function(req, res, next){
	console.log("reached the search route");
	var userList = UserUtils.search(req.params.user);
	userList.then(function(data) {
		res.send(data);
	});
});

module.exports = router;
