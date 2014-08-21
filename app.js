var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var lessMiddleware = require('less-middleware');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
// Start express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(busboy());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ 
	secret: 'securedsession',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

var bootstrapPath = path.join(__dirname, 'node_modules', 'twitter-bootstrap');
app.use(lessMiddleware(__dirname + '/public',{
    debug:true
}));

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

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
