const Schema = require('mongoose').Schema;
module.exports = {
	account: new Schema({
		email: String,
		password: String,
		country: String,
		telephone: String
	}),
	catalog: new Schema({
		productName: String,
		price: Number,
		description: String,
		tags: Array,
		owner: String,
		createdOn: String
	})
};