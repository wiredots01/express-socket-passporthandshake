// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' : '769952913095899',
		'clientSecret' : '4eba2a3ef04967c5c255442a0ba0d7d9',
		'callbackURL' : 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' : 'g9wt2nVrDFMU9LVonEz8DUVE2',
		'consumerSecret' : 'zFkXxCCUvdu5D5NYx5ZqNaUS8oJgfcalKlo3FUOEoyQdHXXp1A',
		'callbackURL' : 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' : '492219918853-1nqsrh8drejpucf8g2gmh4qbutnhpinl.apps.googleusercontent.com',
		'clientSecret' : '37QAZBe7YVklaPBmG5zZUrJG',
		'callbackURL' : 'http://localhost:8080/auth/google/callback'
	}

};