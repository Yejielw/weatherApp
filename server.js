var express = require('express');
var app = express();
app.listen(8000);

app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules'));


