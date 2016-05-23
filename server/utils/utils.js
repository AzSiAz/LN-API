var config = require('../config/config');
var url = config.base_url;
var request = require('request').defaults({ encoding: null });

class Utils {
	static get(query, type) {
		var link = type ? url + query : query;
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
	static getHTML(id) {
		var link = `https://www.baka-tsuki.org/project/index.php?title=${id}`;
		return new Promise(function (resolve, reject) {
			request(link, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve(body.toString());
				}
				else {
					reject(error);
				}
			});
		});
	}
}

module.exports = Utils;