var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

var app = express();

app.listen(8000);


nunjucks.configure(path.join(__dirname),{
	autoescape: true,
	express: app
})
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res){
	res.render('index');
})

module.exports = app;