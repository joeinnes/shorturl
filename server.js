'use strict';

// Requirements
var express = require('express');
var mongo = require('mongodb');
var shortid = require('shortid');

// Set DB connection
var url = 'mongodb://localhost:27017/shorturl';
var hostname = 'https://short-url-joeinnes.c9users.io/';

// App is Express based
var app = express();

// Create the request body object using bodyParser
app.use(function(req, res, next) {
  req.url = req.url.replace(/^(\/new\/)(.+)/, function($0, $1, $2) {
    return $1 + encodeURIComponent($2);
  });
  next();
});

// Handle the /new route
app.get('/new/:link', function (req, res) {
	let val = req.params.link;
	let ident = shortid.generate();
	let doc = {
		"original_url": val,
		"short_url": hostname + ident,
		"ident": ident
	};

	mongo.connect(url, function(err, db) {
		if (err) throw error;
		insertDocuments(db, doc, function(result) {
			console.log(result);
			db.close();
			let resp = {
				"original_url": val,
				"short_url": hostname + ident,
			};
			res.send(resp);
			res.end();
		});
	});
});

app.get('*', function (req, res) {
	var val = req.originalUrl.substring(1);
	mongo.connect(url, function(err, db) {
		if (err) throw error;
		let collection = db.collection('links');
		collection.findOne({'ident': val}, function (err, result) {
			var redirectTo;
			console.log(result);
			if (result) {
				if (result['original_url'].substring(0, 3) !== 'http') {
					redirectTo = 'http://' + result['original_url'];
				} else {
					redirectTo = result['original_url'];
				}
				res.redirect(200, redirectTo)
			} else {
				res.write('Couldn\'t find that URL...');
			}

			res.end();
		});
	});
});


var insertDocuments = function(db, doc, callback) {
  // Get the documents collection
  var collection = db.collection('links');
  // Insert a document
  collection.insert(doc, function(err, result) {
  	if (err) throw error;
    callback(result);
  });
};

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
