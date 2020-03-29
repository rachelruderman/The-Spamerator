const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

//helper function to generate JWT user auth token
function tokenForUser(user){
  const timeStamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret || process.env.secret)
}

//upon login, return auth token
exports.login = function(req, res, next){
  res.send({ token: tokenForUser(req.user) })
}

//validate, create, and save new user sign up
exports.signup = function(req, res, next){
  const email = req.body.email
  const password = req.body.password

  //check if email already registered
  User.findOne({ email: email }, function(err, existingUser){
    if (err) { return next(err) }
    //return error if email already registered
    if(existingUser){
      return res.status(422).send({ error: `That email's taken`})
    }
    //otherwise, create user record
    const user = new User({
      email: email,
      password: password
    })
    //save user record
    user.save(function(err){
      if(err){ return next(err) }
      //if successful, respond with authToken
      res.json({ token: tokenForUser(user) })
    })
  })
}
