var http = 3001, https = 3002;
if (process.env.NODE_ENV == 'test') {
    var https = 3005
    var http = 3006
}

module.exports = {
	'base_url': 'http://127.0.0.1:3003',
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