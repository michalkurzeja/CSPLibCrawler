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
    function DataFilesFetcher(httpClient, fileDownloader, router, descriptionExtractor) {

        /**
         * @private
         * @member {Router} router
         */
        Object.defineProperty(this, 'router', {
            value: router
        });

        /**
         * @private
         * @member {DescriptionExtractor} descriptionExtractor
         */
        Object.defineProperty(this, 'descriptionExtractor', {
            value: descriptionExtractor
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
         * @member {string} problemId
         */
        Object.defineProperty(this, 'problemId', {
            value: null,
            writable: true
        });

        DataFetcher.call(this, httpClient, fileDownloader, router);
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
        return {
            files: getFiles.call(this, $),
            description: this.descriptionExtractor.extract($, $('.container'))
        };
    };

    function getFiles($) {
        var scope = this;

        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            var filename = $td.first().text().trim();
            var fileUrl = getFile.call(scope, $td.first().children('a'));
            scope.fileDownloader.download(fileUrl, filename, scope.problemId);

            return {
                filename: filename,
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim()
            };
        }).toArray();
    }

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
