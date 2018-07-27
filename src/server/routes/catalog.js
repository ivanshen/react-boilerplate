const mongoose = require('mongoose');
const schema = require('../lib/schema');
const catalog = mongoose.model('Catalog', schema.catalog, 'catalog');
const express = require('express');
const router = express.Router();
const log4js = require('log4js');
require('../lib/logger')();
const logger = log4js.getLogger('userprofile.js');

router.get('/catalog/list', function(req, res) {
	const startingIndex = req.query.from || 0;
	const size = req.query.size || 50;
	const query = req.query.query ? {productName: {$regex : `${req.query.query}.*`}} : {}
	catalog.find(query, function(err, doc) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(doc);
		}
	}).limit(size);
})

router.post('/catalog/postitem', function(req, res) {
	if (!req.user) {
		res.status(401).send({ message: 'Not authorized to post item to catalog.'});
		return;
	}
	const itemInfo = {
		productName: req.body.name,
		description: req.body.description,
		price: req.body.price
	}
	catalog.collection.insert(itemInfo, function(err) {
		if (err) {
			logger.error(err);
			res.status(500).send(err);
		} else {
			logger.info(`Account Id: ${req.user._id} has posted ${itemInfo}`)
			res.status(200).send({message: 'OK'});
		}
	})
})
module.exports = router;