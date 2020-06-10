const db = require('../models');
const iplocate = require("node-iplocate");

function userHandler(req, res, next){
  try {
    iplocate('216.185.5.238').then(async function(results) {
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

module.exports = userHandler;
