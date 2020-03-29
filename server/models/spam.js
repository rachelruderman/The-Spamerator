const mongoose = require('mongoose')
const Schema = mongoose.Schema

// tood: check for breaking changes from upgrade to Mongoose 5.0.0  https://mongoosejs.com/docs/migrating_to_5.html

//Define spam schema
const spamSchema = new Schema({
  recipient: { type: String, required: true },
  sms: { type: String, default: null },
  email: { type: String, default: null },
  content: { type: String, required: true },
  date: { type: 'Date', default: Date.now, required: true }
})

//Create model class
const ModelClass = mongoose.model('spam', spamSchema)

//Export model
module.exports = ModelClass
