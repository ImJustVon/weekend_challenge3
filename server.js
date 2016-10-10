var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var calculatorRoute = require('./routes/calculator');
var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.post('/calculator', calculatorRoute);
app.get('/calculator', calculatorRoute);
app.get('/', function (req, res) {
  var filename = (path.join(__dirname, 'public/view/index.html'));
  res.sendFile(filename);
});

app.listen(3000);
