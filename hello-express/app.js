var express = require("express");

var app = express();

app.get('/', function(req, res){
    res.send('Hello Express');
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("listening on port number: " + process.env.PORT);
});