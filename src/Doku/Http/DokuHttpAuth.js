;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var HttpClient  = use('Http.HttpClient');
    var Cheerio     = use('Cheerio');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function DokuHttpAuth(router) {

        /**
         * @private
         * @member {string} url
         */
        Object.defineProperty(this, 'url', {
            value: router.url(getParameter('dokuwiki.host'), 'dokuwiki.login')
        });
    }

    /**
     * @public
     * @returns {Promise}
     */
    DokuHttpAuth.prototype.login = function() {
        var promise = (new HttpClient).get(this.url);

        return promise.then((function(context) {
            return function(result) {
                return context.extractData(Cheerio.load(result.body));
            };
        })(this));
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {Promise}
     */
    DokuHttpAuth.prototype.extractData = function($) {
        var token = $('.action.login').attr('href').split('sectok=')[1];

        var form = {
            u: app.params.user,
            p: app.params.password,
            sectok: token
        };

        var promise = (new HttpClient).post(this.url, { form: form });

        return promise.then((function(context) {
            return function(response) {
                return {
                    response: response,
                    data: Cheerio.load(response.body)
                };
            };
        })(this));
    };

    this.DokuHttpAuth = DokuHttpAuth;
}).call(this);

module.exports = this.DokuHttpAuth;