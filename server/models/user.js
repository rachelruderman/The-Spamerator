const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

//Define user schema
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true }
})

//On Save Hook, encrypt password
userSchema.pre('save', function(next){
  const user = this

  bcrypt.genSalt(10, function(err, salt){
    if(err){ return next(err) }

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ return next(err) }

      user.password = hash
      next()
    })
  })
})

//Compare login password to database password
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){ return callback(err) }
    callback(null, isMatch)
  })
}

//Create model class
const ModelClass = mongoose.model('user', userSchema)

//Export model
module.exports = ModelClass
