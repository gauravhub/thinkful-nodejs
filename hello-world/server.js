var http = require("http");

var server = http.createServer(function(req, res) {
    res.end("hello world\n");
});

server.listen(process.env.PORT, process.env.IP, function () {
    console.log("listening on port " + process.env.PORT);
});