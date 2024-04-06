// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dns = require('dns');
var url = require('url');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Use body-parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// URL Shortener Microservice
var urlDatabase = {}; // This is a simple in-memory URL database. For a real-world application, you should use a persistent database.

app.post('/api/shorturl', function (req, res) {
  var originalUrl = req.body.url;
  var shortUrl = Math.floor(Math.random() * 100000).toString();

  // Check if the URL is valid
  var urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  var hostname = url.parse(originalUrl).hostname;
  dns.lookup(hostname, function (err) {
    if (err) {
      res.json({ error: 'invalid url' });
    } else {
      urlDatabase[shortUrl] = originalUrl;
      res.json({ original_url: originalUrl, short_url: shortUrl });
    }
  });
});

app.get('/api/shorturl/:shortUrl', function (req, res) {
  var shortUrl = req.params.shortUrl;
  var originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
