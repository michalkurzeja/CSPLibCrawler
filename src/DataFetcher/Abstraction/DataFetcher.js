(function() {
    'use strict';

    var PageLoader = require('../../PageLoader/PageLoader');
    var cheerio = require('cheerio');

    function DataFetcher(url) {
        Object.defineProperty(this, 'url', {value: url, writable: true});
        Object.defineProperty(this, 'pageLoader', {value: new PageLoader()});
    }

    DataFetcher.prototype.fetch = function() {
        var promise = this.pageLoader.loadHTML(this.url);

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