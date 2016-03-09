var exports = module.exports = {};

const app = require('auto-loader').load(__dirname);

require("bluebird").promisifyAll(require("request"));

exports.crawl = function() {
    var dataFetcher = new app.DataFetcher.CategoryListFetcher;

    dataFetcher
        .fetch()
        .then(function(data) {
            console.log(data);
        })
    ;
};