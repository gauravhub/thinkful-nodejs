var viewEngine = require('./viewEngine.js');
var querystring = require("querystring");
var items = [];

function isValidRequest(req, res, index) {
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

function handlePostData(req, postDataAction) {
    var postData = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        postData += chunk;
    });
    req.on('end', function () {
        var item = querystring.parse(postData).item;
        postDataAction(item);
    });
}

function rediretTo(req, res, path) {
    res.writeHead(302, {
        Location: (req.socket.encrypted ? 'https://' : 'http://') + req.headers.host + path
    });
    res.end();
}

var shoppingListCtrl = {
    index: function (req, res) {
        viewEngine.render(res, 'index.ejs', items);
    },
    
    create: function (req, res) {
        handlePostData(req, function(item){
            items.push(item);
            rediretTo(req, res, "/");
        });
    },
    
    update: function (req, res, index) {
        if(isValidRequest(req, res, index))
        {
            handlePostData(req, function(item){
                items[index] = item;
                res.end();
            });
        }
    },
    
    destroy: function (req, res, index) {
        if(isValidRequest(req, res, index))
        {
            handlePostData(req, function(item){
                items.splice(index, 1);
                res.end();
            });
        }        
    }
};

module.exports = shoppingListCtrl;