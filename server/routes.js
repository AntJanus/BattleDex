var express = require('express');
var app = module.exports = express();

app.use('/', function(req, res) {
  res.send('');
});
