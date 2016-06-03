var http = 5000;

module.exports = {
	'base_url': 'http://btapi.netserv.fr',
	'express': {
		'adresse': '0.0.0.0',
		'http': http,
	},
    // useless for now
	'database': {
		'type': 'mysql',
		'host': '127.0.0.1',
		'username': 'root',
		'password': 'ZDFP',
		'database': 'bt-api'
	}
};
