const db = require('../models');
const iplocate = require("node-iplocate");

function postUser(req, res, next){
  try {
    iplocate('13.10.185.190').then(async function(results) {
      let newUser = await db.User.create({
          ip: results.ip,
          country: results.country,
          country_code: results.country_code,
          city: results.city,
          time_zone: results.time_zone,
          postal_code: results.postal_code,
          state: results.subdivision,
          latitude: results.latitude,
          longitude: results.longitude,
          minPrice: req.body.minPrice,
          maxPrice: req.body.maxPrice,
          genres: req.body.genres
      });
      return res.status(200).json(newUser);
    });
  }
  catch{

  }
}

function getUser(req, res, next) {
    db.User.find({}, function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
}

function getUserById(req, res, next) {
  db.User.find({_id:req.params.id}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

function getUsersByCountry(req, res, next) {
  db.User.find({country_code:req.params.country}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

function getUsersByState(req, res, next) {
  db.User.find({state:req.params.state}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

function getUsersByCity(req, res, next) {
  db.User.find({city:req.params.city}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

function getUsersByTimeZone(req, res, next) {
  db.User.find({time_zone:req.params.time}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  })
}

module.exports.getUsersByTimeZone = getUsersByTimeZone;
module.exports.getUsersByCity = getUsersByCity;
module.exports.getUsersByState = getUsersByState;
module.exports.getUsersByCountry = getUsersByCountry;
module.exports.getUserById = getUserById;
module.exports.postUser = postUser;
module.exports.getUser = getUser;
