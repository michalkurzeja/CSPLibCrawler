;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function ResultsFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'problemId', {value: null, writable: true});
        DataFetcher.call(this);
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
    ResultsFetcher.prototype.fetch = function(problemId) {
        this.problemId = problemId;
        var url = this.router.url('%csplib.host%', 'csplib.problem.results', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    ResultsFetcher.prototype.extractData = function($) {
        var desc = getDescription($);
        return {
            files: getFiles.call(this, $),
            description: desc
        }
    };

    function getFiles($) {
        var scope = this;

        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            return {
                filename: $td.first().text().trim(),
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim(),
                file: getFile.call(scope, $td.first().children('a'))
            };
        }).toArray();
    }

    /**
     * @private
     * @param {Cheerio} $a
     * @returns {string}
     */
    function getFile($a) {
        return this.router.url('%csplib.host%', 'csplib.problem.results.file', {problemId: this.problemId, fileName: $a.text().trim()})
    }

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string[]}
     */
    function getDescription($) {
        return $('.container').children().not('.bib').not('table').not('.page-header').map(function(i, paragraph) {
            return $(paragraph).wrap('<div></div>').parent().html();
        }).toArray()
    }

    Util.inherits(ResultsFetcher, DataFetcher);

    this.ResultsFetcher = ResultsFetcher;
}).call(this);

module.exports = this.ResultsFetcher;
