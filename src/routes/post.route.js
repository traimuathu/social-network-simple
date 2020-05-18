const express = require('express');
const router = express.Router();

// Post.Controller
const PostController = require('../controllers/post.controller');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, '../public/images/posts'));
  },
  filename: (req, file, cb) => {
    cb(null, req.user.username + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const types = ['image/jpeg', 'images/png', 'image/jpg', 'image/gif'];
    if(types.indexOf(file.mimetype) === -1) {
      cb(null, false);
    }
    return cb(null, true);
  } 
})

router.post('/newpost', uploadFile.single('imagePost'), PostController.NewPost);

router.get('/:id/view', PostController.DetailPost);

// router.post('/editpost', PostController.EditPost);

// router.post('/deletepost', PostController.DeletePost);

router.post('/comment', PostController.CommentPost);

// router.post('/like', PostController.Like);

module.exports = router;