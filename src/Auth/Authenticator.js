;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var HttpClient  = use('Http.HttpClient');
    var cheerio     = use('Cheerio');
    var util        = use('Util');

    function Authenticator(url) {
        DataFetcher.call(this, app.params.lokiPath + 'start&do=login');
    }

    Authenticator.prototype.login = function() {
        var promise = (new HttpClient).get(this.url);

        return promise.then((function(context) {
            return function(result) {
                return context.extractData(cheerio.load(result.body));
            };
        })(this));
    };

    Authenticator.prototype.extractData = function($) {
        var token = $('.action.login').attr('href').split('sectok=')[1];

        var form = {
            u: app.params.user,
            p: app.params.password,
            sectok: token
        };

        var promise = (new HttpClient).post(app.params.lokiPath + 'start&do=login', form);

        return promise.then((function(context) {
            return function(result) {
                return cheerio.load(result.body);
            };
        })(this));
    };

    util.inherits(Authenticator, DataFetcher);

    this.Authenticator = Authenticator;
}).call(this);

module.exports = this.Authenticator;