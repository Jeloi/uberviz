// config/passport.js

var UberStrategy = require('passport-uber').Strategy;
var uberConfig = require('./auth').uber;


module.exports = function(passport, baseURL) {
	console.log(uberConfig.clientID);
	console.log(uberConfig.clientSecret);
	console.log(baseURL);

	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
	    User.findById(id, function(err, user) {
	        done(err, user);
	    });
	});

	passport.use(new UberStrategy({
	    clientID: uberConfig.clientID,
	    clientSecret: uberConfig.clientSecret,
	    callbackURL: baseURL+"/auth/uber/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ uberid: profile.id }, function (err, user) {
	      return done(err, user);
	    });
	  }
	));
}