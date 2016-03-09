(function() {
    'use strict';

    var PageLoader = require('../../PageLoader/PageLoader');
    var cheerio = require('cheerio');

    function DataFetcher(url) {
        Object.defineProperty(this, '$', {value: {}, writable: true});
        Object.defineProperty(this, 'pageLoader', {value: new PageLoader(), writable: true});
        this.$ = this.loadHTML(url);
    }

    DataFetcher.prototype.fetch = function() {
        throw 'Cannot use method of abstract class!';
    };

    DataFetcher.prototype.loadHTML = function(url) {
        var html = this.pageLoader.loadHTML(url);
        return cheerio.load(html);
    };

    this.DataFetcher = DataFetcher;
}).call(this);

module.exports = this.DataFetcher;