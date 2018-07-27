const express = require('express');
const router = express.Router();
const log4js = require('log4js');
require('../lib/logger')();
const logger = log4js.getLogger('userprofile.js');
const mongoose = require('mongoose');
const schema = require('../lib/schema');
const bcrypt = require('../lib/bcrypt');
const account = mongoose.model('Account', schema.account);

router.post('/user/save', function(req, res) {
	account.collection.update({_id: req.user._id}, {$set: {email: req.body.email, name: req.body.name, country: req.body.country}}, function(err) {
		if (err) {
			res.status(500).send({message: err});
		} else {
			logger.info(`Updated the information for account ${req.user._id}.`);
			res.status(200).send({message: 'OK'});
		}
	});
});

router.get('/user/information', function(req, res) {
	account.collection.findOne({_id: req.user._id}, function(err, user) {
		if (err) {
			res.status(500).send({message: err});
		} else {
			logger.info(`Retrieved the information for account ${req.user._id}`);
			res.status(200).send({email: user.email, name: user.name, country: user.country})
		}
	})
});

router.post('/user/password', function(req, res) {
	account.collection.findOne({_id: req.user._id}, function(err, user) {
		if (err) {
			res.status(500).send({message: err})
		} else {
			bcrypt.compare(req.body.currentPassword, user.password).then(isSame => {
				if (isSame) {
					bcrypt.hash(req.body.newPassword).then(newPassword => {
						account.collection.update({_id: req.user._id}, {$set: {password: newPassword}}, function(err, user) {
							logger.info(`Password updated for account ${req.user._id}`);
							res.status(200).send({message: 'OK'});
						})
					})
				} else {
					res.status(401).send({message: 'Incorrect passsword.'})
				}
			}).catch(err => {
				logger.error(err);
			});
		}
	});
})

module.exports = router;