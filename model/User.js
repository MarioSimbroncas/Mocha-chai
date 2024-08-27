const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  create_time: {
    type: Date,
    default: Date.now,
  },
  update_time: {
    type: Date,
    default: Date.now,
  },
  create_user: {
    type: String,
    required: false,
    default: "0",
  },
  update_user: {
    type: String,
    required: false,
    default: "0",
  },
});

module.exports = mongoose.model("User", userSchema);
