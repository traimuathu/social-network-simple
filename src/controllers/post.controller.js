const PostSchema = require('../models/post.model');
const UserSchema = require('../models/user.model');
const async = require('async');

const Middleware = require('../utils/middleware');

const PostController = {};

PostController.NewPost = (req, res) => {
  const content = req.body.content;
  const file = req.file;

  const userLog = {
    userid: req.user._id,
    fullname: req.user.fullname,
    image: req.user.avatar
  }

  if(!file) {
    return res.send({msg: 'Please upload image with post'});
  }

  async.waterfall([
    cb => {
      const newPost = new PostSchema();
      newPost.content = content.trim();
      newPost.image = file.filename;
      newPost.owner = {
        userid: req.user._id,
        fullname: req.user.fullname,
        image: req.user.avatar
      };
      newPost.save((err, data) => {
        if(err) res.send({msg: 'Error...'});
        if(data) cb(null, data);
      });
    },
    (data, callback) => {
      UserSchema.findOneAndUpdate({_id: req.user._id}, {$push: 
        {
          posts: {
            postId: data._id,
            content: data.content,
            image: data.image
          }
        }
      }, (err, log) => {
          if(err) res.send({msg: 'Error....'});
          res.redirect('/Home');
        });
      }
  ]);
}

PostController.DetailPost = (req, res) => {
  if(req.params.id) {
    Middleware.findId(PostSchema, {_id: req.params.id})
      .then(data => {
        res.render('post/detailpost', {postid: req.params.id, post: data});
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  }
}

// PostController.Comment = (req, res) => {
//   if(req.params.id) {

//   }
// }

// PostController.Like = (req, res) => {
//   if(req.params.id) {

//   }
// }

// PostController.EditPost = (req, res) => {
//   if(req.params.id) {

//   }
// }

// PostController.DeletePost = (req, res) => {
//   if(req.params.id) {

//   }
// }


module.exports = PostController;
