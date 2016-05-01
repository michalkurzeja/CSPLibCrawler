;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {DataFileContentGenerator} generator
     * @param {DokuClient} client
     */
    function DataFilesPublisher(generator, client) {

        /**
         * @private
         * @member {AuthorContentGenerator} generator
         */
        Object.defineProperty(this, 'generator', {
            value: generator
        });

        /**
         * @private
         * @member {DokuClient} client
         */
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    /**
     * @public
     * @param {object} problemsData
     * @returns {Promise}
     */
    DataFilesPublisher.prototype.publish = function(problemsData) {
        var promises = [];

        for (var i in problemsData) {
            var dataFiles = problemsData[i].dataFiles;

            for (var j in dataFiles.files) {
                var problemId = problemsData[i].id;
                var dataFile = dataFiles.files[j];

                var content = this.generator.generate({
                    problem: {
                        id: problemId,
                        name: problemsData[i].specification.name
                    },
                    dataFile: dataFile
                });

                var pageId = getPageId(dataFile, problemId);

                promises.push(this.client.editPage(pageId, content));
            }
        }

        return Promise
            .all(promises)
            .then(function() {
                return new Promise(function(resolve) {
                    return resolve(problemsData);
                });
            });
    };

    /**
     * @private
     * @param {object} result
     * @returns {string}
     */
    function getPageId(result) {
        return 'dane:' + result.filename.toLowerCase().replace(/ /g, '-');
    }

    this.DataFilesPublisher = DataFilesPublisher;
}).call(this);

module.exports = this.DataFilesPublisher;