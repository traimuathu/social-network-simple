const IndexController = {};

IndexController.IndexPage = (req, res) => {
  res.render('index');
}

module.exports = IndexController;