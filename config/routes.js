module.exports = function(app, passport) {
	// ====================== NORMAL ROUTES ====================== //
	app.get('/', function(req, res) {
		console.log("taya nimo oi!",req.headers.host);
		res.render('index', { title: 'Test', user : setUserData(req.user), base: req.headers.host });
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('users/profile', {
			user: req.user,
			userProfile : setUserData(req.user)
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/test', function(req, res){
		res.render('chat');
	});






	// ====================== AUTHENTICATION ====================== //
	app.get('/login', function(req, res) {
		res.render('users/login', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		res.render('users/signup', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));



	// ====================== SOCIAL AUTH ====================== //

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));



	// ====================== CONNECT SOCIAL ACCOUNTS ====================== //

	app.get('/connect/local', function(req, res) {
		res.render('connect-local', { message: req.flash('loginMessage') });
	});

	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/connect/local',
		failureFlash : true
	}));

	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

	app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

	app.get('/connect/twitter/callback',
		passport.authorize('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

	app.get('/connect/google/callback',
		passport.authorize('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));



	// ====================== LOGOUT ====================== //

	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	app.get('/unlink/twitter', isLoggedIn, function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	app.get('/unlink/google', isLoggedIn, function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


	app.get('/:title', function(req, res){
		console.log('awa ang params',req.params);
		res.render('posts/show', {
			title: req.params.title
		});
	});


};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

function setUserData(user){
	filteredUser = null;
	if (user){
		switch(user.primary){
			case 'facebook':
				filteredUser = user.facebook;
				break;
			case 'twitter':
				filteredUser = user.twitter;
				break;
			case 'google':
				filteredUser = user.google;
				break;
			default:
				filteredUser = {};
				break;
		}
	}
  return filteredUser;
}
