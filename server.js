'use strict';

var express = require('express');
const queryString = require('query-string');

var app = express();

app.get('*', function (req, res) {
	console.log(req.headers);
	res.end();
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});