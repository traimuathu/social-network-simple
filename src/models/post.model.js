const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	content  : {type:String, trim:true},
	image : {type:String, trim:true},
  likes : {type: Array},
  comments: [{
    user: {type: Object},
    fullname: {type: String},
    username: {type: String},
    comment: {type: String}
  }],
	datePost   : {type:Date, default:Date.now()},
	owner  : Object
});
module.exports = mongoose.model('posts', PostSchema, 'posts');