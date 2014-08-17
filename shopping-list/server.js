var http = require('http');
var url = require('url');
var qs = require("querystring");
var router = require("./routes.js");

var items = [];

var server = http.createServer(function (req, res) {
    router(req, res);
});

server.listen(process.env.PORT, process.env.IP, function(){
   console.log('listening on port ' + process.env.PORT);
}); 