var express = require('express');
var app = express();

var DEFAULT_PORT = 8080;

app.use('/public', express.static(__dirname + "/public"));
app.use('/fonts', express.static(__dirname + "/public/fonts"));
app.all('/*', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(DEFAULT_PORT);
console.log("App listening on port " + DEFAULT_PORT);