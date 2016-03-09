(function() {
    'use strict';

    var HttpClient = app.Http.HttpClient;
    var cheerio = require('cheerio');

    function DataFetcher(url) {
        Object.defineProperty(this, 'url', {value: url, writable: true});
        Object.defineProperty(this, 'httpClient', {value: new HttpClient()});
    }

    DataFetcher.prototype.fetch = function() {
        var promise = this.httpClient.get(this.url);

        return promise.then((function(context) {
            return function(result) {
                var $ = cheerio.load(result.body);
                return context.extractData($);
            };
        })(this));
    };

    DataFetcher.prototype.extractData = function($) {
        throw 'You can\'t call this method!';
    };

    this.DataFetcher = DataFetcher;
}).call(this);

module.exports = this.DataFetcher;