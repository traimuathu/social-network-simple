const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/profile/:id', UserController.ProfilePage);

module.exports = router;