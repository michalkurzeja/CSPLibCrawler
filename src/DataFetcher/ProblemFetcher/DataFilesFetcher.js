;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function DataFilesFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'problemId', {value: null, writable: true});
        DataFetcher.call(this);
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
    DataFilesFetcher.prototype.fetch = function(problemId) {
        this.problemId = problemId;
        var url = this.router.url('%csplib.host%', 'csplib.problem.data_files', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    DataFilesFetcher.prototype.extractData = function($) {
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
    };

    /**
     * @private
     * @param {Cheerio} $a
     * @returns {string}
     */
    function getFile($a) {
        return this.router.url('%csplib.host%', 'csplib.problem.data_files.file', {problemId: this.problemId, fileName: $a.text().trim()})
    }

    Util.inherits(DataFilesFetcher, DataFetcher);

    this.DataFilesFetcher = DataFilesFetcher;
}).call(this);

module.exports = this.DataFilesFetcher;
