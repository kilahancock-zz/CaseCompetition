const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
  }
//to be added based off of user form
});

const User = mongoose.model("User", userSchema);

module.exports = User;
