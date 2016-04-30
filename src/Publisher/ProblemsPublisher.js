;(function() {
    "use strict";

    var Promise = use('Bluebird');

    function ProblemsPublisher(listFetcher, problemCategoriesFetcher, publisher) {
        Object.defineProperty(this, 'listFetcher', {value: listFetcher});
        Object.defineProperty(this, 'problemCategoriesFetcher', {value: problemCategoriesFetcher});
        Object.defineProperty(this, 'publisher', {value: publisher});
    }

    ProblemsPublisher.prototype.publish = function(cookieJar) {
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
                        if (problemId != 'prob001') continue; // TODO remove (it's just for debugging to limit pages)
                        promises.push(scope.publisher.publish(cookieJar, problemId, problemCategories[problemId]));
                    }

                    return Promise.all(promises);
                }
            })(this));
    };

    this.ProblemsPublisher = ProblemsPublisher;
}).call(this);

module.exports = this.ProblemsPublisher;