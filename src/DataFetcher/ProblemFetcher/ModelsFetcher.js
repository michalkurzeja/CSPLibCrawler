;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     * @param {DescriptionExtractor} descriptionExtractor
     */
    function ModelsFetcher(router, descriptionExtractor) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'descriptionExtractor', {value: descriptionExtractor});
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
            description: this.descriptionExtractor.extract($, $('.container'))
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

    Util.inherits(ModelsFetcher, DataFetcher);

    this.ModelsFetcher = ModelsFetcher;
}).call(this);

module.exports = this.ModelsFetcher;
