var exports = module.exports = {};

var DataFetcher = require('./DataFetcher/CategoryListFetcher');
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

exports.crawl = function() {
    var dataFetcher = new DataFetcher();

    dataFetcher.fetch().then(function(data) {
        console.log(data);
    });
};