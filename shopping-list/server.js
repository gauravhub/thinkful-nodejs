var http = require('http');
var url = require('url');
var qs = require("querystring");

var items = [];

var server = http.createServer(function (req, res) {
    
    function getItemIndex(req) {
        var pathname = url.parse(req.url).pathname;
        var i = parseInt(pathname.slice(1), 10);
        return i;
    }
    
    function isValidRequest(req) {
        var index = getItemIndex(req);
        if (isNaN(index)) {
            res.statusCode = 400;
            res.end('Index should be an integer value');
            return false;
        }       
        else if (!items[index]) {
            res.statusCode = 404;
            res.end('Item not found');
            return false;
        }
        else {
            return true;
        }
    }
    
    function handlePostData(postDataAction) {
        var item = '';
        var index = getItemIndex(req);
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        });
        req.on('end', function () {
            postDataAction(index, item);
        });
    }
    
    switch (req.method) {
        case 'GET':
                    items.forEach(function (item, i) {
                        res.write(i + '. ' + item + '\n');
                    });
                    res.end();
                    break;
    
        case 'POST':
                    handlePostData(function(index, item){
                        items.push(item);
                        res.end('Item added successfully');
                    });
                    break;
                    
        case 'PUT':
                    if(isValidRequest(req))
                    {
                        handlePostData(function(index, item){
                            items[index] = item;
                            res.end('Item updated successfully');
                        });
                    }
                    break;

        case 'DELETE':
                    if(isValidRequest(req))
                    {
                        handlePostData(function(index, item){
                            items.splice(getItemIndex(req), 1);
                            res.end('Item deleted successfully');
                        });
                    }
                    break;
    }
});

server.listen(process.env.PORT, process.env.IP, function(){
   console.log('listening on port ' + process.env.PORT);
}); 