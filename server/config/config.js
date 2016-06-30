var http = process.env.PORT || 3001;

module.exports = {
	'base_url': 'http://127.0.0.1:3003',
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
