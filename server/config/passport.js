// config/passport.js

var UberStrategy = require('passport-uber').Strategy;

module.exports = function(passport) {
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
	    clientID: ID,
	    clientSecret: SECRET,
	    callbackURL: "http://127.0.0.1:3000/auth/uber/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate({ uberid: profile.id }, function (err, user) {
	      return done(err, user);
	    });
	  }
	));
}