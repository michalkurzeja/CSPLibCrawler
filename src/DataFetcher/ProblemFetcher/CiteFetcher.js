;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function CiteFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
    CiteFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem.cite', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    CiteFetcher.prototype.extractData = function($) {
        return {
            problem: getProblemCite($),
            csplib: getCspLibCite($)
        }
    };

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string}
     */
    function getProblemCite($) {
        return getCite($('pre').first().text().trim());
    }

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string}
     */
    function getCspLibCite($) {
        return getCite($('pre').last().text().trim());
    }

    /**
     * @private
     * @param {string} text
     * @returns {string}
     */
    function getCite(text) {
        return '\n\t' + text.replace(/\n/g, '\n\t');
    }

    Util.inherits(CiteFetcher, DataFetcher);

    this.CiteFetcher = CiteFetcher;
}).call(this);

module.exports = this.CiteFetcher;
