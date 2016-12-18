var path = require("path");

var config = {
    entry: "./app/js/app.js",
    output: {
        path: path.resolve("../ShorterPathAlg.API/public/scripts/"),
        publicPath: "/scripts/",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

module.exports = config;