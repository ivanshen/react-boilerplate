const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
	hash: (text) => {
		return bcrypt.hash(text, saltRounds);
	},
	compare: (data, encrypted) => {
		return bcrypt.compare(data, encrypted);
	}
}