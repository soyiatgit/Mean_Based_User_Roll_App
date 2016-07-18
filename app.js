var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var routes = require('./routes/index');
var users = require('./routes/users');
var newroute = require('./routes/newroute');

var app = express();

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');
  
  var Cat =  require('./models/cats');
  var Users = require('./models/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(function(req, res, next) {
	console.log('hi');
	next();
	
});





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(a,b,c){
	console.log("abc middleware");
	c();
});

app.use('/new', function(req, res, next) {
  console.log('use method from app');
  next();
});
app.get('/new', function(req, res, next) {
  console.log('get method from app');

	var kitty = new Cat({ name: 'Zildjian' });
	kitty.save(function (err) {
	  if (err) {
		console.log(err);
	  } else {
		console.log('meow');
	  }
});
    res.send("responded from get");

});

app.get('/cats', function(req,res,next) {
	 Cat.find({}, function (err, cats) {
		 if(err) {
			 next(err);
		 }
		 console.log(res);
		res.send(cats);
    });	
});
app.post('/new', function(req, res, next) {
  console.log('post method from app');
  res.send("responded from post");
});

app.get('/usersList', function(req, res, next){
	console.log("reached the user route");
	
	Users.find({}, function(err, data){
		console.log(data);
		if(err)
			next(err);
			res.send(data);
	});
});

app.post('/addUser', function(req, res, next){
	console.log("reached the add user route");
	
	var age = Number(req.body.age);
	req.body.age = age;

	user.save(function(err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is saved");
	});
});

app.delete('/deleteUser/:userId', function(req, res, next){
	console.log("reached the delete user route");
	console.log(req.params.userId);
	Users.remove({_id: req.params.userId},function( err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is removed");
	});
});


app.put('/updateUser', function(req, res, next){
	console.log("reached the delete user route");
	console.log(req.params.userId);
	Users.findOneAndUpdate({_id: req.body._id}, req.body,function( err){
		if(err){
			console.log(err);
			next(err);
		}
		res.send("data is updatedd");
	});
	
});

app.use('/', routes);
app.use('/users', users);
app.use('/new', newroute);




app.get('/test', function(req, res, next) {
  res.send('hello this is test');
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
