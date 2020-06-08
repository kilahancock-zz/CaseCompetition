const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/streamPair', {
  keepAlive: true
});

//add collections here if more are needed
module.exports.User = require('./user');
