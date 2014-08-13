var http = require("http");

var server = http.createServer(function(req, res) {
    res.end("hello world\n");
});

server.listen(9000, function () {
    console.log("listening on port 9000");
})