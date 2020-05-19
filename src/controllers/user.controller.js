const Middleware = require('../utils/middleware');
const UserSchema = require('../models/user.model');

const moment = require('moment');

const UserController = {};

UserController.ProfilePage = (req, res) => {
  const id = req.params.id;
  if(req.user) {
    Middleware.findOneData(UserSchema, {_id: id})
      .then(data => {
        res.render('user/profile', {userid: id, data: data, user: req.user, moment: moment});
      })
  }
}

UserController.UpDateInformation = (req, res) => {

}

UserController.GetPassword = (req, res) => {

}

UserController.UpdateStatus = (req, res) => {

}

UserController.ChangPassword = (req, res) => {
  
}

module.exports = UserController;