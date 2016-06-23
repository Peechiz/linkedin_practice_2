var express = require('express'),
    app = express(),
    path = require('path');
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


require('dotenv').config();
require('locus');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// above app.use('/', routes);...
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1,process.env.KEY2]
}))
app.use(express.static(path.join(__dirname, 'public')));


passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_API_KEY,
  clientSecret: process.env.LINKEDIN_SECRET_KEY,
  callbackURL: process.env.HOST + "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  return done(null, {id: profile.id, displayName: profile.displayName, email: profile.emails[0].value, photos: profile.photos})
}));

// routes
app.use((req,res,next)=>{
  if (!req.session.passport) {
    res.locals.user = null;
    next();
  }
  else {
    res.locals.user = req.session.passport.user;
    next();
  }
})

var main = require('./routes/main.js');
var auth = require('./routes/auth.js');


app.use('/', main);
app.use('/auth', auth);

// start server
var port = process.env.PORT || 3000;
app.listen(port,() => {
  console.log('Servering at ' + port);
});
