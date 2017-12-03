const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const schema = require('../lib/schema');
const account = mongoose.model('Account', schema.account);
var bcrypt = require('bcrypt');
const saltRounds = 10;
passport.use(new LocalStrategy(function(username, password, done) {
	account.findOne({email: username}, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			console.log("Incorrect username");
			return done(null, false, { message: 'Incorrect username.' });
		}
		bcrypt.compare(password, user.password).then(function(res) {
            return res ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
		});
		
	});
}));

function authenticate(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send({status: 401, message: 'Invalid username or password'}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({status: 200, redirect: '/'});
    });
  })(req, res, next);
}

router.post('/login', authenticate);

router.get('/logout', function(req, res){
  req.logOut();
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

router.post('/signup', function(req, res) {
	account.count({email: req.body.email}, function(err, count) {
		if (count > 0) {
			res.send({status: 302, message: 'User exists'});
		} else {
			bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
				account.collection.insert({
					email: req.body.email,
					password: hash
				});
				res.send({status: 200, message: 'User created', redirect: '/'});
			});
		}
	})
})

router.get('/validate', function(req, res){
	if (req.user) {
		res.send({status: 200, user: req.user.id});
	} else {
		res.send({status: 401, user: null})
	}
})
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //If using Mongoose with MongoDB; if other you will need JS specific to that schema
    account.findById(id, function (err, user) {
        done(err, user);
    });
});
module.exports = {
	routes: router,
	authenticate: authenticate
}