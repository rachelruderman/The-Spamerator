const Spam = require('../models/spam')
const sgMail = require('@sendgrid/mail')
const Twilio = require('thehelp-messaging').Twilio;
const config = require('../config')
require('dotenv').config()

//SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//Twilio API key/Token
const twilioOptions = {
    THEHELP_TWILIO_KEY: config.THEHELP_TWILIO_KEY || process.env.THEHELP_TWILIO_KEY,
    THEHELP_TWILIO_TOKEN: config.THEHELP_TWILIO_TOKEN || process.env.THEHELP_TWILIO_TOKEN
}
const twilio = new Twilio(twilioOptions)
const number = config.TWILIO_NUMBER || process.env.TWILIO_NUMBER

//Create, save, and deliver spam
exports.newSpam = function(req, res, next){
  const recipient = req.body.recipient
  const method    = req.body.method
  const content   = req.body.content
  let email       = null
  let sms         = null

  //determine if method is email or sms
  if   (method.includes('@')) { email = method }
  else                        { sms   = method }

  //create spam entry in database
  const spam = new Spam({
    recipient: recipient,
    email:     email,
    sms:       sms,
    content:   content
  })

  //save spam entry in database
  spam.save(function(err){
    if(err){ return next(err) }
    res.json({ success: true })
  })

  //if spam is an email, deliver via SendGrid
  if(email){
    let msg = {
      to:      `${email}`,
      from:    `${email}`,
      subject: `The Spamerator has struck, ${recipient}!`,
      text:    '#SorryNotSorry',
      html:    `${content}`
    }
    sgMail.send(msg, function(err){
      if (err) { throw err }
    })
    email = null //set email back to null
  }

  //if spam is an SMS, deliver via Twilio
  if(sms){
    let text = {
      From: `${number}`,
      To: `+1${sms}`,
      Body: `Hey ${recipient}, the Spamerator has struck! ${content}`
    }
    twilio.send(text, function(err) {
      if (err) { throw err }
    })
    sms = null //set sms back to null
  }

}

//Fetch spamlog from database in chronological order
exports.getSpam = function(req, res, next){
  Spam.find().sort('-date').exec((err, spam) => {
    if(err){ return next(err) }
    res.json({ spam })
  })
}
