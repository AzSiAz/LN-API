const express = require('express');
// const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./server/config/config');
const http = require('http');
const cors = require('cors')
const app = express();

app.set('json spaces', 4);

app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./server/routes'));

var server = http.createServer(app).listen(config.express.http);

module.exports = app;
