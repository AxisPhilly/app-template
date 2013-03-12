var server  = require('./server.js'),
    fs      = require('fs'),
    request = require('request');

var count=0;

server.routes.get.forEach(function(route, i, arr) {
  request.get('http://localhost:' + process.env.PORT + route.path, function(err, res, body) {
    if (err) throw err;
    var fileName = (route.path === '/') ? '/index.html' : route.path.split('/')[1] + '.html';

    fs.writeFile('www/' + fileName, body, function(err) {
      if (err) throw err;
      console.log(fileName + ' saved');
      count++;

      // kill the server if we are done
      if(count === arr.length) { process.exit(0); }
    });
  });
});
