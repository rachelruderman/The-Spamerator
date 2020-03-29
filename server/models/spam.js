const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
