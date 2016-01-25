var co = require('co');
var jsdom = require("jsdom");
var config = require('../config/config');
var fs = require("fs");
var knex = require('knex')(config.database);
var url = config.base_url;
var request = require('request').defaults({ encoding: null });

var utils = {
  get: function get(query, type) {
    var link = type ? url + query:query;
    return new Promise(function (resolve, reject) {
        request(link, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            }
            else {
                reject(error);
            }
        });
    });
  }
}

module.exports = utils;