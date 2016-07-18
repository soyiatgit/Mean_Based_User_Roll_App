var user = {};
var UserModel = require('../models/users');
var Promise = require("bluebird");
// user.list = function(res) {

	// UserModel.find({}, function(err, data){
			// res.send(data);
	// });
// }

	user.list = function() {
		var promise = new Promise( function (resolve, reject) {
			console.log("here i m")
			UserModel.find({}, function(err, data){
				if(err) 
					reject(err);
				else 
					resolve(data)
			});
		});
			return promise
	}

	user.find = function(user) {
		var promise = new Promise( function (resolve, reject) {
			console.log("here i m in find")
			user.getSimilarExp(function(err, data){
				if(err) 
					reject(err);
				else 
					resolve(data)
			});
		});
			return promise
	}

	user.search = function(user) {
		var promise = new Promise( function (resolve, reject) {
			console.log("here i m in search")
			UserModel.search(user,function(err, data){
				if(err) 
					reject(err);
				else 
					resolve(data)
			});
		});
			return promise
	}


module.exports = user;