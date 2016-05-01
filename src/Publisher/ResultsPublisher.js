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
     * @param {string} problemId
     * @param {string} filename
     * @returns {string}
     */
    function getPageId(problemId, filename) {
        return 'wynik:' + problemId + ':' + filename.toLowerCase().replace(/ /g, '-');
    }

    this.ResultsPublisher = ResultsPublisher;
}).call(this);

module.exports = this.ResultsPublisher;