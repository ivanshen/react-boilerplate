const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const authLib = require('../lib/auth');
function getPublicPath(view) {
	return path.join(process.cwd(), 'public', 'views', `${view}.html`)
}
router.get('/', function(req, res) {
	res.sendFile(getPublicPath('home'));
});

router.get('/login', function(req, res) {
	if (req.user) {
		res.redirect('/');
	} else {
		res.sendFile(getPublicPath('login'));
	}
});

router.get('/signup', function(req, res) {
	if (req.user) {
		res.redirect('/');
	} else {
		res.sendFile(getPublicPath('signup'))
	}
})

module.exports = router;