//app.js

// Load dependencies
var express = require('express');
var app = express();

var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

// Settings
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Development Settings
if (app.get('env') === 'development') {
    // Development Application Settings
    app.set('baseURL', 'http://localhost:3000');

    // This will change in production since we'll be using the dist folder
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production Settings
if (app.get('env') === 'production') {
    // Production Application Settings
    app.set('baseURL', 'http://uberviz.co'); //TODO: Pick my production url

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// Pass passport for configuration, and baseUrl for callbackURL
require('./config/passport')(passport, app.get('baseURL'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport




module.exports = app;
