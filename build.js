var server  = require('./server.js'),
    fs      = require('fs'),
    request = require('request');

server.routes.get.forEach(function(route, i, arr) {
  request.get('http://0.0.0.0:3000' + route.path, function(err, res, body) {
    var fileName = (route.path === '/') ? '/index.html' : route.path.split('/')[1] + '.html'; 

    fs.writeFile('www/' + fileName, body, function(err) {
      if (err) throw err;
      console.log(fileName + ' saved.');

      // kill the server if we are done
      if(i === arr.length - 1) { process.exit(0); }
    });
  });
});