const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Middleware = require('../utils/middleware');

// User.Model
const UserSchema = require('../models/user.model');

module.exports = passport => {
 
  /* ------- LOGIN ------- */
  passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    Middleware.findOneData(UserSchema, {email: email})
      .then(data => {
        const flag = bcrypt.compareSync(password, data.password)
        if(flag) {
          return done(null, data);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        return done(null, false);
      });
  }));


  // UserSchema.findOne({email: email}).then(user => {

  //   if (!user) { return done(null, false); }
  
  //   bcrypt.compare(password, user.password, (err, isFlag) => {
  //     if(err) {
  //       console.log(err);
  //     }

  //     if(isFlag) {
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //     }
  //   });
  // })
  // .catch(err => console.log('Error:', err));

  /* ------- SIGNUP ------- */
  // passport.use('local-signup', new LocalStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password',
  //   passReqToCallback: true
  // }, async (req, email, password, done) => {
  //   // if(req.user) {
  //   //   return done(null, false);
  //   // }

  //   await UserSchema.findOne({email: email}).then(user => {
  //       if(user) {
  //         return done(null, false);
  //       }

  //       const newUser = new UserSchema();
  //       newUser.fullname = req.body.fullname;
  //       newUser.username = req.body.username;
  //       newUser.email = email,
  //       newUser.password = newUser.generateHash(password);

  //       newUser.save((err, savedUser) => {
  //         if(err) {
  //           return done(err, false);
  //         }

  //         return done(null, savedUser);
  //       })
  //     })
  //     .catch(err => done(err, false));
  // }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}
