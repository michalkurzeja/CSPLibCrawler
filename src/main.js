var exports = module.exports = {};

var DataFetcher = require('./DataFetcher/CategoryListFetcher');

exports.crawl = function() {
    var dataFetcher = new DataFetcher();

    dataFetcher.fetch();
    //var url = 'http://www.csplib.org/';
    //
    //request.get(url, function (error, response, html) {
    //    if (!error) {
    //        var $ = cheerio.load(html);
    //
    //        var linkText = $('a[href="/Problems/categories.html"]').first().text();
    //
    //        console.log(linkText);
    //    }
    //});
};