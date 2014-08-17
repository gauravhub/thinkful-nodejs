var url = require("url");
var shoppingListCtrl = require("./shoppingListCtrl.js");

var routes = {
     '^GET /$': shoppingListCtrl.index,
     '^POST /$': shoppingListCtrl.create,
     '^PUT /((\\d)+)$': shoppingListCtrl.update,
     '^DELETE /((\\d)+)$': shoppingListCtrl.destroy
}

var router = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var route = req.method + " " + pathname;

    var routeMatched = false;
    for (var routeKey in routes) {
        if (routes.hasOwnProperty(routeKey)) {
            var matches = route.match(routeKey);
            if(matches) {
                routeMatched = true;
                routes[routeKey](req, res, matches[1]);
            }
        }
    }
    
    if(!routeMatched) {
        res.statusCode = 404;
        res.end("Invalid route " + route);
    }
};

module.exports = router;