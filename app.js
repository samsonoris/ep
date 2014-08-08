var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

// Start express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

var bootstrapPath = path.join(__dirname, 'node_modules', 'twitter-bootstrap');

app.use(lessMiddleware(__dirname + '/public',{
    debug:true
}));


app.use(express.static(__dirname + '/public'));

app.use('/', routes);

// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("In /Login");
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
