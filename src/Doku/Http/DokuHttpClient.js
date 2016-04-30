;(function() {
    'use strict';

    var DokuHttpAuth = use('Doku.Http.DokuHttpAuth');
    var HttpClient   = use('Http.HttpClient');

    /**
     * @constructor
     */
    function DokuHttpClient(httpClient, dokuHttpAuth) {

        /**
         * @private
         * @var {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpClient', {
            value: httpClient
        });

        /**
         * @private
         * @var {CookieJar} httpCookieJar
         */
        Object.defineProperty(this, 'httpCookieJar', {
            value: null,
            writable: true
        });

        /**
         * @private
         * @var {DokuHttpAuth} httpAuth
         */
        Object.defineProperty(this, 'httpAuth', {
            value: dokuHttpAuth
        });
    }

    /**
     * @public
     * @return {Promise}
     */
    DokuHttpClient.prototype.login = function() {
        var that = this;

        return this.httpAuth
            .login()
            .then(
                function(result) {
                    that.httpCookieJar = result.response.jar();
                    return result;
                }
            )
        ;
    };

    /**
     * @public
     * @param {string} url
     * @param {string[]} data
     * @return {Promise}
     */
    DokuHttpClient.prototype.get = function(url, data) {
        return this.httpClient.get(url, data, this.httpCookieJar);
    };

    /**
     * @public
     * @param {string} url
     * @param {string[]} data
     * @return {Promise}
     */
    DokuHttpClient.prototype.post = function(url, data) {
        return this.httpClient.post(url, data, this.httpCookieJar);
    };

    this.DokuHttpClient = DokuHttpClient;
}).call(this);

module.exports = this.DokuHttpClient;