const express = require('express');
const compress = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./server/config/config');
const cors = require('cors')
const app = express();

app.set('json spaces', 2);

if (process.env.NODE_ENV != 'test') {
  app.use(logger('dev'));
}

app.use(cors());
app.use(compress());

app.use(bodyParser.json({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./server/routes'));

if (process.env.NODE_ENV == 'test') {
  module.exports = app;
}
else {
  app.listen(config.express.http, config.express.adresse);    
}


