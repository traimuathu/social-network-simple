const Middleware = {}

Middleware.getData = (db) => {
  return new Promise((resolve, reject) => {
    db.find((err, data) => {
      if(err) reject(err);
      if(data) {
        resolve(data);
      }
    })
  })
}

Middleware.findId = (db, obj) => {
  return new Promise((resolve, reject) => {
    db.findById(obj, (err, data) => {
      if(err) reject(err);
      if(data) resolve(data);
    });
  })
}

Middleware.findOneData = (db, obj) => {
  return new Promise((resolve, reject) => {
    db.findOne(obj, (err, data) => {
      if(err) reject(err);
      if(data) {
        resolve(data);
      }
    })
  })
}

Middleware.checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.redirect("/Login");
  }
}

Middleware.findAndUpdate = (db, obj) => {
  return new Promise((resolve, reject) => {
    
  })
}

module.exports = Middleware;