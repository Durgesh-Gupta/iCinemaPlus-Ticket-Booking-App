const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  IS_DELETE:{
    type:Boolean,
    default:false
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
