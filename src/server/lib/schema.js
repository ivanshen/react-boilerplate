const Schema = require('mongoose').Schema;
module.exports = {
	account: new Schema({
		email: String,
		password: String
	})
};