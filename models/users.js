
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var userSchema = new Schema({ name: String ,
					 exp: String,
					 cell: Number,
					 joining : {type:Date, default : new Date()}
				   });
				   
	userSchema.methods.getSimilarExp = function (callback){
		//find without callback will not run
		console.log(this, this.model.toString());
		return this.model('Users').find({ exp: this.exp }, callback);
	}
	userSchema.statics.search = function search (name, callback) {
		return this.where('name', new RegExp(name, 'i')).exec(callback);
}
 module.exports = mongoose.model('Users',userSchema);