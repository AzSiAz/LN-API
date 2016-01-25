const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./server/config/config');
const app = express();
const http = require('http');
const https = require('https');
const fs = require("fs");
const cors = require('cors')
var apicache = require('apicache').options({ debug: true }).middleware;

// var options = {
//   key: fs.readFileSync("key/dev.private.key"),
//   cert: fs.readFileSync("key/dev.certificate.pem")
// };

var options = {
  key: fs.readFileSync("key/azsiaz.tech.key"),
  cert: fs.readFileSync("key/azsiaz.tech.pem")
};

app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * Cache Middleware
 */

// app.use(apicache('10 minutes'));

/*
 * Route
 */

app.use('/', require('./server/routes'));

var server = http.createServer(app).listen(config.express.http);
var secureServer = https.createServer(options, app).listen(config.express.https);

// module.exports = server;
