const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ip: {
    type: String
  },
  country: {
    type: String
  },
  country_code: {
    type: String
  },
  city: {
    type: String
  },
  time_zone: {
    type: String
  },
  postal_code: {
    type: String
  },
  state: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  minPrice: {
    type: Number
  },
  maxPrice: {
    type: Number
  },
  genres: {
    type: [String]
  }

//to be added based off of user form
});

const User = mongoose.model("User", userSchema);

module.exports = User;
