const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {type: String, trim: true, unique: false},
  username: {type: String, trim: true, default: ""},
  password: {type: String, trim: true},
  fullname: {type: String, trim: true, unique: false},
  age: {type: Number},
  avatar: {type: String, trim: true, default: 'https://via.placeholder.com/150'},
  phone: {type: Number, default: ""},
  address: {type: String, trim: true, default: ""},
  status: {type: String, trim: true, default: ""},
  likes: {type: Number, default: 0},
  ruler: {type: Number, default: 3},
  posts: [{
    postId: {type: Object},
    content: {type: String, trim: true},
    image: {type: String, trim: true}
  }],
  createAt: {type: Date, default: Date.now}
});

// UserSchema.methods.generateHash = password => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// UserSchema.methods.verifyPassword = password => {
//   return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('users', UserSchema, 'users');