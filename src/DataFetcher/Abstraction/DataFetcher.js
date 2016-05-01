(function() {
    'use strict';

    var HttpClient  = use('Http.HttpClient');
    var cheerio     = use('Cheerio');

    /**
     * @constructor
     */
    function DataFetcher() {

        /**
         * @private
         * @member {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpClient', {
            value: new HttpClient()
        });
    }

    /**
     * @public
     * @param {string} url
     * @returns {Promise}
     */
    DataFetcher.prototype.fetch = function(url) {
        var promise = this.httpClient.get(url);

        return promise.then((function(context) {
            return function(result) {
                var $ = cheerio.load(result.body);
                var obj = context.extractData($);
                return mutateData(obj, url);
            };
        })(this));
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    DataFetcher.prototype.extractData = function($) {
        throw 'You can\'t call this method!';
    };

    /**
     * @private
     * @param {*} obj
     * @param {string} url
     * @returns {*}
     */
    function mutateData(obj, url) {
        var base;
        var path;

        url = url.replace('http://', '');
        url = url.split('/');

        base = 'http://' + url.shift();
        path = url.join('/');

        return mutateElement(obj, base, path);
    }

    /**
     * @private
     * @param {*} obj
     * @param {string} base
     * @param {path} path
     * @returns {*}
     */
    function mutateElement(obj, base, path) {
        if (isArray(obj) || isObject(obj)) {
            for (var i in obj) {
                obj[i] = mutateElement(obj[i], base, path);
            }
        }
        else if (typeof(obj) == 'string' || obj instanceof String) {
            obj = obj
                .replace(/\<img alt=\"(.*?)\" src=\"(.*?)\">/gi, '<img alt="$1" src="' + base + '/' + path + '/$2">')
                .replace(/\<a href=\"\/(.*?)\"\>(.*?)\<\/a\>/gi, '<a href="' + base + '/$1">$2</a>')
                .replace(/\<a href=\"(([\.]{1,2}\/)+?)(.*?)\"\>(.*?)\<\/a\>/gi, '<a href="' + base + '/' + path + '/$2$3">$4</a>')
            ;
        }

        return obj;
    }

    /**
     * @private
     * @param {*} a
     * @returns {boolean}
     */
    function isArray(a) {
        return (!!a) && (a.constructor === Array);
    }

    /**
     * @private
     * @param {*} a
     * @returns {boolean}
     */
    function isObject(a) {
        return (!!a) && (a.constructor === Object);
    };

    this.DataFetcher = DataFetcher;
}).call(this);

module.exports = this.DataFetcher;