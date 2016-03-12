(function() {
    'use strict';

    var HttpClient  = use('Http.HttpClient');
    var cheerio     = use('Cheerio');

    function DataFetcher() {
        Object.defineProperty(this, 'httpClient', {value: new HttpClient()});
    }

    DataFetcher.prototype.fetch = function(url) {
        var promise = this.httpClient.get(url);

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