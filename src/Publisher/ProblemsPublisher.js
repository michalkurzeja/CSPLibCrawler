;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param listFetcher
     * @param problemCategoriesFetcher
     * @param publisher
     */
    function ProblemsPublisher(listFetcher, problemCategoriesFetcher, publisher) {

        /**
         * @public
         * @member listFetcher
         */
        Object.defineProperty(this, 'listFetcher', {
            value: listFetcher
        });

        /**
         * @public
         * @member problemCategoriesFetcher
         */
        Object.defineProperty(this, 'problemCategoriesFetcher', {
            value: problemCategoriesFetcher
        });

        /**
         * @public
         * @member publisher
         */
        Object.defineProperty(this, 'publisher', {
            value: publisher
        });
    }

    /**
     * @public
     * @returns {Promise}
     */
    ProblemsPublisher.prototype.publish = function() {
        return this.listFetcher
            .fetch()
            .then((function(scope) {
                return function(problemData) {
                    return [
                        problemData,
                        scope.problemCategoriesFetcher.fetch()
                    ];
                }
            })(this))
            .spread((function(scope) {
                return function(problemData, problemCategories) {
                    var promises = [];

                    for (var i in problemData) {
                        var problemId = problemData[i].problemId;
                        //if (problemId != 'prob040') continue; // TODO remove (it's just for debugging to limit pages)
                        promises.push(scope.publisher.publish(problemId, problemCategories[problemId]));
                    }

                    return Promise.all(promises);
                }
            })(this));
    };

    this.ProblemsPublisher = ProblemsPublisher;
}).call(this);

module.exports = this.ProblemsPublisher;