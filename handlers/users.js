const db = require('../models');

async function userHandler(req, res, next){
  try {
    let newUser = await db.User.create(req.body);
    return res.status(200).json(newUser);
  }
  catch{

  }
}

module.exports = userHandler;
