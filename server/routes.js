//routes.js
module.exports = function(app, passport) {
	/* GET home page. */
	app.get('/', function(req, res) {
		res.render('blah', { title: 'Express' });
	});

	/* Uber Authentication Routes */
	app.get('/auth/uber', passport.authenticate('uber'));

	app.get('/auth/uber/callback', 
		passport.authenticate('uber', { failureRedirect: '/login' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/');
		}
	);
}

