const express = require('express')
const http = require ('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

//DB Set Up
const uristring =
process.env.MONGODB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost:auth/auth'

mongoose.connect(uristring, function (err, res) {
  if (err) { console.log (`ERROR connecting to: ${uristring}. ${err}`) }
  else { console.log (`SUCCESS connecting to: ${uristring}`) }
})

//Express Set Up
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
app.use(express.static(path.resolve(__dirname, '../client/build')))
router(app)

//Server Set Up
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)

console.log('Server listening on:', port)
