const express = require('express');
const compress = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./server/config/config');
const cors = require('cors')
const app = express();


app.set('json spaces', 2);

app.use(cors());
app.use(compress());

app.use(logger('dev'));

app.use(bodyParser.json({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./server/routes'));

app.listen(config.express.http, config.express.adresse);