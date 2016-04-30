;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function ModelsFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'problemId', {value: null, writable: true});
        DataFetcher.call(this);
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
    ModelsFetcher.prototype.fetch = function(problemId) {
        this.problemId = problemId;
        var url = this.router.url('%csplib.host%', 'csplib.problem.models', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    ModelsFetcher.prototype.extractData = function($) {
        return {
            files: getFiles.call(this, $),
            description: getDescription($)
        }
    };

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string[]}
     */
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
        return this.router.url('%csplib.host%', 'csplib.problem.models.file', {problemId: this.problemId, fileName: $a.text().trim()})
    }

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string}
     */
    function getDescription($) {
        return $('.container').children('p').not('.bib').map(function(i, paragraph) {
            return $(paragraph).text();
        }).toArray()
    }

    Util.inherits(ModelsFetcher, DataFetcher);

    this.ModelsFetcher = ModelsFetcher;
}).call(this);

module.exports = this.ModelsFetcher;
