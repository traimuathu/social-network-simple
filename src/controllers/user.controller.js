const UserController = {}

UserController.ProfilePage = (req, res) => {
  if(req.user) {
    res.render('user/profile');
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