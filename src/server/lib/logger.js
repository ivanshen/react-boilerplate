const log4js = require('log4js');
const config = require('../../../config/logger.json')
module.exports = function() {
	log4js.configure(config);
}

