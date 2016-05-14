;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {ResultContentGenerator} generator
     * @param {DokuClient} client
     */
    function ResultsPublisher(generator, client) {

        /**
         * @private
         * @member {ResultContentGenerator} generator
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
    ResultsPublisher.prototype.publish = function(problemsData) {
        var promises = [];
        var completed = 0;
        var totalSize = getTotalSize(problemsData);

        process.stdout.write('Results: 0%\r');

        for (var i in problemsData) {
            var problemResults = problemsData[i].results;

            for (var j in problemResults.files) {
                var problemId = problemsData[i].id;

                var result = problemResults.files[j];
                var content = this.generator.generate({
                    problem: {
                        id: problemId,
                        name: problemsData[i].specification.name
                    },
                    result: result
                });

                var pageId = getPageId(problemId, result.filename);

                var promise = this.client
                    .editPage(pageId, content)
                    .then(function (data) {
                        process.stdout.write('Results: ' + Math.round((++completed / totalSize) * 100) + '%\r');
                        return data;
                    });

                promises.push(promise);
            }
        }

        return Promise
            .all(promises)
            .then(function(data) {
                process.stdout.write('\n');
                return data;
            })
            .then(function() {
                return new Promise(function(resolve) {
                    return resolve(problemsData);
                });
            });
    };

    function getTotalSize(problemsData) {
        var size = 0;

        for (var i in problemsData) {
            size += problemsData[i].results.files.length;
        }

        return size;
    }

    /**
     * @private
     * @param {string} problemId
     * @param {string} filename
     * @returns {string}
     */
    function getPageId(problemId, filename) {
        return 'result:' + problemId + ':' + filename.toLowerCase().replace(/ /g, '-');
    }

    this.ResultsPublisher = ResultsPublisher;
}).call(this);

module.exports = this.ResultsPublisher;