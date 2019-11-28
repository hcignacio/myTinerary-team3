const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true
  },
  mail: {
    type: String,
    unique: true,
    required: true
  },
  country: String,
  picture: String
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('users', userSchema, 'users');