const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const log4js = require('log4js');
require('./lib/logger')();
const logger = log4js.getLogger('app.js');
const mongoose = require('mongoose');
const env = require('../../config/env.json');
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const authLib = require('./lib/auth');
app.set('title', 'Business');
//app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept')
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	next();
});
  
app.use(express.static(path.join(process.cwd(), 'public')))
app.use(bodyParser.json());
app.use(cookieParser('secrettexthere'))
app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: false,
  resave: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) },
  store: new MongoStore({
    url: env.database_url,
    autoReconnect: true,
    clear_interval: 3600
  })
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(env.database_url, {server: {socketOptions: {keepAlive: 1}}}, function(err) {
	if (err) {
		logger.error(`Error connecting to the database with message ${err}`);
	} else {
		logger.info("Connected to the database");
	}
});

app.use(require('./routes/routes'));
app.use(require('./routes/userprofile'));
app.use(require('./routes/catalog'));
//app.use(require('./routes/locationSelector'));
app.use(authLib.routes);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.listen(env.port, function () {
	logger.info(`Example app listening on port ${env.port}!`)
})

