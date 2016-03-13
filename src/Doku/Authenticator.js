;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var HttpClient  = use('Http.HttpClient');
    var Cheerio     = use('Cheerio');
    var Util        = use('Util');

    function Authenticator(router) {
        Object.defineProperty(this, 'url', {
            value: router.url(getParameter('dokuwiki.host'), 'dokuwiki.login')
        });
    }

    Authenticator.prototype.login = function() {
        var promise = (new HttpClient).get(this.url);

        return promise.then((function(context) {
            return function(result) {
                return context.extractData(Cheerio.load(result.body));
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

        var promise = (new HttpClient).post({ url: this.url, form: form });

        return promise.then((function(context) {
            return function(response) {
                return {
                    response: response,
                    data: Cheerio.load(response.body)
                };
            };
        })(this));
    };

    this.Authenticator = Authenticator;
}).call(this);

module.exports = this.Authenticator;