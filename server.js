'use strict';

var express = require('express');

var app = express();

app.get('*', function (req, res) {
	let ip = req.headers['x-forwarded-for'];
	let lang = req.headers['accept-language'].split(',')[0];
	let os = req.headers['user-agent'].split('(')[1].split(')')[0];
	let headers = {
		ipaddress: ip,
		language: lang,
		software: os
	}
	res.send(headers);
	res.end();
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});