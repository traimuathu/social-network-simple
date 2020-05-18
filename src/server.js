const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const dotenv = require('dotenv');
const favicon = require('serve-favicon');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Keys = require('./config/keys');
const passport = require('passport');
const flash = require('connect-flash');

module.exports = app => {
  dotenv.config();
  
  mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}); 

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // Session Configuration
  app.use(session({
    secret: Keys.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 24 * 60 * 60
    })
  }));

  // Passportjs Configuration
  require('./config/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.user = req.user || null
    next();
  });

  // Static
  app.use('/static', express.static(path.join(__dirname, 'public')));
  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(favicon(__dirname + '/public/images/fav.ico'));

  // Router
  app.use('/', require('./routes/index.route'));
  app.use('/', require('./routes/auth.route'));
  app.use('/post', require('./routes/post.route'));

  app.use(flash());

  app.use((req, res) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.err = req.flash('err');
  });

  const port = process.env.PORT || 8133;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}