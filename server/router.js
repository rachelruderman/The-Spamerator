const Authentication = require('./controllers/authentication')
const Spam = require('./controllers/spam')
const passportService = require('./services/passport')
const passport = require('passport')
const path = require('path')

//by default, passport wants to create a cookie-based session for the request, but since we're using tokens we set it to false
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function(app){

  app.post('/login', requireLogin, Authentication.login)
  app.post('/signup', Authentication.signup)
  app.post('/spam-away', Spam.newSpam)
  app.get('/spam-history', Spam.getSpam)

  //all remaining requests return the React app, so it can handle routing
  app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })
}
