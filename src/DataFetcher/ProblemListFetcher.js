;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {HttpClient} httpClient
     * @param {DokuHttpDownloaderFile} fileDownloader
     * @param {Router} router
     */
    function ProblemListFetcher(httpClient, fileDownloader, router) {

        /**
         * @private
         * @member {string} url
         */
        Object.defineProperty(this, 'url', {
            value: router.url('%csplib.host%', 'csplib.problems')
        });

        DataFetcher.call(this, httpClient, fileDownloader, router);
    }

    /**
     * @public
     * @returns {Promise}
     */
    ProblemListFetcher.prototype.fetch = function() {
        return DataFetcher.prototype.fetch.call(this, this.url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    ProblemListFetcher.prototype.extractData = function($) {
        return $('tr').slice(1).map(function(i, row) {
            return {
                problemId: $(row).children('td').find('a').text().trim()
            }
        }).toArray();
    };

    Util.inherits(ProblemListFetcher, DataFetcher);

    this.ProblemListFetcher = ProblemListFetcher;
}).call(this);

module.exports = this.ProblemListFetcher;