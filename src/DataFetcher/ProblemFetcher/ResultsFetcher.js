;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {HttpClient} httpClient
     * @param {DokuHttpDownloaderFile} fileDownloader
     * @param {Router} router
     * @param {DescriptionExtractor} descriptionExtractor
     */
    function ResultsFetcher(httpClient, fileDownloader, router, descriptionExtractor) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'descriptionExtractor', {value: descriptionExtractor});
        Object.defineProperty(this, 'fileDownloader', {value: fileDownloader});
        Object.defineProperty(this, 'problemId', {value: null, writable: true});
        DataFetcher.call(this, httpClient, fileDownloader, router);
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
        return {
            files: getFiles.call(this, $),
            description: this.descriptionExtractor.extract($, $('.container'))
        }
    };

    function getFiles($) {
        var scope = this;

        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            var filename = $td.first().text().trim();
            var fileUrl = getFile.call(scope, $td.first().children('a'));

            return {
                filename: filename,
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim(),
                file: scope.fileDownloader.download(fileUrl, filename, scope.problemId)
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

    Util.inherits(ResultsFetcher, DataFetcher);

    this.ResultsFetcher = ResultsFetcher;
}).call(this);

module.exports = this.ResultsFetcher;
