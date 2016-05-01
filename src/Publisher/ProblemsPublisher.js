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
                    var completed = 0;

                    process.stdout.write('Problems: 0%\r');


                    for (var i in problemData) {
                        var problemId = problemData[i].problemId;

                        var promise = scope.publisher
                            .publish(problemId, problemCategories[problemId])
                            .then(function(data) {
                                process.stdout.write('Problems: ' + Math.round((++completed / problemData.length) * 100) + '%\r');
                                return data;
                            });

                        promises.push(promise);
                    }

                    return Promise
                        .all(promises)
                        .then(function(data) {
                            process.stdout.write('\n');
                            return data;
                        });
                }
            })(this));
    };

    this.ProblemsPublisher = ProblemsPublisher;
}).call(this);

module.exports = this.ProblemsPublisher;