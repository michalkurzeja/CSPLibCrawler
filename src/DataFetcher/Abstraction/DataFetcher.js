(function() {
    'use strict';

    var cheerio                 = use('Cheerio');

    /**
     * @constructor
     * @param {HttpClient} httpClient
     * @param {DokuHttpDownloaderFile} fileDownloader
     * @param {Router} router
     */
    function DataFetcher(httpClient, fileDownloader, router) {

        /**
         * @private
         * @member {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpClient', {
            value: httpClient
        });

        /**
         * @private
         * @member {DokuHttpDownloaderFile} fileDownloader
         */
        Object.defineProperty(this, 'fileDownloader', {
            value: fileDownloader
        });

        /**
         * @private
         * @member {Router} router
         */
        Object.defineProperty(this, 'router', {
            value: router
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
                return mutateData.call(context, obj, url);
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

        return mutateElement.call(this, obj, base, path);
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
                obj[i] = mutateElement.call(this, obj[i], base, path);
            }
        }
        else if (typeof(obj) == 'string' || obj instanceof String) {

            var pattern = /src=\"(.*?)\"/gi;
            var match;

            while (match = pattern.exec(obj)) {
                var url = match[1];
                this.fileDownloader.download(base + '/'  + path + '/' + url, getImageName(url));
            }

            obj = obj
                .replace(/\<img(.*?)src=\"(.*?)\/([^\.\/]*?)\.([a-zA-Z0-9]*?)\"(.*?)\>/gi, '</html>{{:csplib:$3.$4|}}<html>')
                .replace(/\<a href=\"\/(.*?)\"\>(.*?)\<\/a\>/gi, '<a href="' + base + '/$1">$2</a>')
                .replace(/\<a href=\"(([\.]{1,2}\/)+?)(.*?)\"\>(.*?)\<\/a\>/gi, '<a href="' + base + '/' + path + '/$2$3">$4</a>')
            ;
        }

        return obj;
    }

    function getImageName(imageUrl) {
        return imageUrl.slice(imageUrl.lastIndexOf('/')+1);
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