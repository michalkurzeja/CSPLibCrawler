;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param fetcher
     * @param generator
     * @param client
     */
    function ProblemPublisher(fetcher, generator, client) {

        /**
         * @private
         * @member fetcher
         */
        Object.defineProperty(this, 'fetcher', {
            value: fetcher
        });

        /**
         * @private
         * @member generator
         */
        Object.defineProperty(this, 'generator', {
            value: generator
        });

        /**
         * @private
         * @member client
         */
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    /**
     * @public
     * @param {string} problemId
     * @param {string[]} categories
     * @returns {Promise}
     */
    ProblemPublisher.prototype.publish = function(problemId, categories) {
        return this.fetcher
            .fetch(problemId)
            .then((function(scope) {
                return function(data) {
                    data.specification.categories = categories;

                    var pageId = 'problem:' + problemId;
                    var content = scope.generator.generate({
                        id: problemId,
                        data: data
                    });

                    return scope.client
                        .editPage(pageId, content)
                        .then(function() {
                            return new Promise(function(resolve) {
                                return resolve(data);
                            });
                        });
                }
            })(this));
    };

    this.ProblemPublisher = ProblemPublisher;
}).call(this);

module.exports = this.ProblemPublisher;