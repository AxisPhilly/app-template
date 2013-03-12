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
  dest: __dirname + '/css',
  debug: true,
  force: true
}));

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res){
  res.render('index', {
    title: 'App Title | AxisPhilly',
    env: app.settings.env
  });
});

app.get('/embed', function(req, res){
  res.render('embed', {
    title: 'App Title | AxisPhilly',
    env: app.settings.env
  });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Express started on port ' + port);

// make the express server available when this file is required
module.exports = app;