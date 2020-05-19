const UserSchema = require('../models/user.model');
const PostSchema = require('../models/post.model');
const bcrypt = require('bcrypt');
const moment = require('moment');

const Middleware = require('../utils/middleware');

const AuthController = {};

AuthController.LoginPage = (req, res) => {
  if(req.user) {
    res.redirect('/Home');
  } else {
    res.render('user/login', {title: 'Login Page'});
  }
}

AuthController.Login = (req, res) => {
  res.redirect('/');
}

AuthController.SignupPage = (req, res) => {
  if(req.user) {
    res.redirect('/Home');
  } else {
    res.render('user/signup', {title: 'REGISTER PAGE'});
  }
}

AuthController.Signup = (req, res) => {
  const { fullname, username, email, password, password2 } = req.body;

  let errors = [];

  if(!fullname || !username || !email || !password) {
    errors.push({msg: 'Please enter full field'});
  }

  if(password != password2) {
    errors.push({msg: 'Password Error!'});
  }

  if(errors.length > 0) {
    res.render('user/signup', {errors});
  } else {
    UserSchema.findOne({email: email})
      .then(user => {
        if(user) {
          errors.push({msg: 'Email is exist'});
          res.render('user/signup', {errors});
        } else {
          const newUser = new UserSchema({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
          });

          newUser.save(err => {
            if(err) throw err;
            res.redirect('/Login');
          })
          
        //   bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser
        //       .save()
        //       .then(user => {
                
        //         res.redirect('/Login');
        //       })
        //       .catch(err => console.log(err));
        //   });
        // });
          
        }
      })
      .catch(err => console.log(err));
  }

}

AuthController.Logout = (req, res) => {
  if(req.session || req.user) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  } else {
    res.redirect('/Login');
  }
}

AuthController.HomePage = async (req, res) => {
  if(req.user) {
    Middleware.getData(PostSchema)
      .then(data => {
        // console.log(data[0]);
        // console.log([...data].map(el => el.comments));
        res.render('user/home', {user: req.user, posts: data, moment: moment});
      })
      .catch(err => console.log(err));
  }
  
  // if(req.user) {
  //   await PostSchema.find((err, data) => {
  //     if(err) return err;
  //     console.log(data);
  //     res.render('user/home', {user: req.user, posts: data});
  //   })
  //   // sort({ field: 'asc', test: -1 });
  // } else {
  //   res.redirect('/Login');
  // }
  // res.render('user/home');
}

module.exports = AuthController;