var http = 3001, https = 3002;
if (process.env.NODE_ENV == 'test') {
    https = 3005
    http = 3006
}

module.exports = {
	'base_url': 'http://api.azsiaz.tech:3003',
	'express': {
		'adresse': '127.0.0.1',
		'http': http,
		'https': https
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