var express = require('express');
var sass = require('node-sass');

var app = express();

// https://github.com/visionmedia/express/blob/master/examples/ejs/index.js
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// https://github.com/andrew/node-sass
app.use(sass.middleware({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  debug: true,
  force: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res){
  res.render('index', {
    title: 'Hello!',
    env: app.settings.env
  });
});

app.get('/foo', function(req, res){
  res.render('index', {
    title: 'Testing another route!',
    env: app.settings.env
  });
});

app.listen(3000);

console.log('Express started on port 3000');

// make the express server available when this file is required
module.exports = app;