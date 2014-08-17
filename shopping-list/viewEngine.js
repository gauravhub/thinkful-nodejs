var fs = require("fs");
var ejs = require("ejs");

var render = function (res, fileName, model) {
    var filePath = __dirname + "/views/" + fileName;
    var template = fs.readFileSync(filePath, "utf-8");
    var html = ejs.render(template, {model: model});
    res.write(html);
    res.end();
}

module.exports = { render: render };