var fs = require("fs");
var dns = require("dns");

fs.readFile('domain-names.txt', 'utf-8', function(err, data) {
    if(err) {
        console.log(err);
    }    
    else {
        dns.resolve4(data, function (err, addresses) {
            if (err) { 
                console.log(err);
            }
            else {
                console.log('addresses: ' + JSON.stringify(addresses));
            }
        });
    }
});
