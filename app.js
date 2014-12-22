var express = require('express');
var routes = require('./server/routes');
var app = express();

//dependencies
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

//settings
app.use(serveStatic('build', {'index': ['index.html']}));
app.use(routes);

if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

app.listen(3000);
