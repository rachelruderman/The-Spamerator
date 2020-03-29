const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const config = require('../config')

//Create Passport LocalStrategy to verify email/password when a user logs in
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //look for email address in database
  User.findOne({ email: email }, function(err, user){
    if (err)         { return done(err)         } //if db error, return error
    if (!user)       { return done(null, false) } //if email not found in database, return false
    //if email found in database, compare encrypted password to user.password
    user.comparePassword(password, function(err, isMatch){
      if (err)       { return done(err)         } //if db error, return error
      if (!isMatch)  { return done(null, false) } //if passwords don't match, return false
                       return done(null, user)    //if all is well, return user object
    })
  })
})

//Create Passport JWT Strategy to verify tokens when a user signs up
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret || process.env.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //payload is the decoded JWT token, use it to check if user exists in the database
  User.findById(payload.sub, function(err, user){
    if (err)  { return done(err, false) } //if error, return error
    if (user) { done(null, user ) } //if user exists, call 'done' with user object
    else      { done(null, false) } //if user does not exist, call 'done' without user object
  })
})

//Tell Passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
