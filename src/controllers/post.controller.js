const PostSchema = require('../models/post.model');
const UserSchema = require('../models/user.model');
const async = require('async');

const moment = require('moment');

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
        console.log(data);
        res.render('post/detailpost', {postid: req.params.id, post: data, moment: moment});
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  }
}

PostController.CommentPost = (req, res) => {
  const comment = req.body.comment;
  const postId = req.body.postid;

  if(comment == '') {
    return false
  } else {
    PostSchema.findOneAndUpdate({_id: postId}, {
      $push: {
        comments: {
          user: req.user._id,
          fullname: req.user.fullname,
          username: req.user.username,
          comment: comment
        }
      }
    }, (err, data) => {
      if(err) res.json({msg: err});
      res.redirect(`/post/${postId}/view`);
    });
  }
}

PostController.LikePost = (req, res) => {
  const post_id = req.body.id;
  const userid = req.user._id;
  Middleware.findId(PostSchema, {_id: req.body.post_id})
    .then(data => {
      const flag = data.likes.include(post_id);
      if(!flag) {
        Middleware.findOneData(UserSchema, {_id: data.owner.userid})
          .then(user => {
            if(user) {
              user.likes = user.likes + 1;
              user.save((err, u) => {
                if(err) res.json({msg: 'err'});
                if(u) {
                  data.likes.push(userid);
                  data.save((err, data) => {
                    if(err) res.json({msg: err});
                    if(data) {
                      res.send(data);
                    }
                  })
                }
              })
            }
          }).catch(err => {
            throw err
          })
      }
    }).catch(err => {
      throw err
    })
}

// PostController.LikeCount = (req, res) => {
  
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
