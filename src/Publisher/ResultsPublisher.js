;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {AuthorContentGenerator} generator
     * @param {DokuClient} client
     */
    function ResultsPublisher(generator, client) {

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
    ResultsPublisher.prototype.publish = function(problemsData) {
        var promises = [];

        for (var i in problemsData) {
            var problemResults = problemsData[i].results;

            for (var j in problemResults) {
                var result = problemResults[j];
                var content = this.generator.generate({result: result});

                promises.push(this.client.editPage(getPageId(result), content));
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
        return 'wynik:' + result.filename.toLowerCase().replace(/ /g, '-');
    }

    this.ResultsPublisher = ResultsPublisher;
}).call(this);

module.exports = this.ResultsPublisher;