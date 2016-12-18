var fs = require("fs-extra");
var path = require("path");

var source = path.resolve("app");
var dest = path.resolve("../ShorterPathAlg.API/public");

fs.copy(source + "/index.html", dest + "/index.html", function (err) {
    if (err) return console.error(err)
});

fs.copy(source + "/css", dest + "/css", function (err) {
    if (err) return console.error(err)
});

console.log("Successfully copied static files")
