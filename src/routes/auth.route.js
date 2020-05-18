const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware
const Middleware = require('../utils/middleware');

// AuthController.Controller
const AuthController = require('../controllers/auth.controller');

/* ------ LOGIN ------- */
router.get('/Login', AuthController.LoginPage);

// router.post('/Login', passport.authenticate('local', {
// 	successRedirect: '/Home',
// 	failureRedirect : '/Login',
// 	failureFlash : false
// }));

router.post('/Login', passport.authenticate('local.login', {
	successRedirect: '/Home',
	failureRedirect: '/Login',
	failureFlash: false
}));

/* ------- SIGNUP ------- */
router.get('/Signup', AuthController.SignupPage);

router.post('/Signup', AuthController.Signup);

/* ------- LOGOUT ------- */
router.get('/Logout', AuthController.Logout);

/* ------- HOME ------- */
router.get('/Home', AuthController.HomePage);

module.exports = router;