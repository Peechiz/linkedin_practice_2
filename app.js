var express = require('express'),
    app = express(),
    path = require('path');
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


require('dotenv').config();
require('locus');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// above app.use('/', routes);...
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
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_API_KEY,
  clientSecret: process.env.LINKEDIN_SECRET_KEY,
  callbackURL: process.env.HOST + "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));


// routes

var main = require('./routes/main.js');
var auth = require('./routes/auth.js');

app.use('/', main);
app.use('/auth', auth);

// start server
var port = process.env.port || 3000;
app.listen(port,() => {
  console.log('Servering at ' + port);
});
