;(function() {
    'use strict';

    var Promise = use("Bluebird");

    function ProblemFetcher(specificationFetcher, dataFilesFetcher) {
        Object.defineProperty(this, 'specificationFetcher', {value: specificationFetcher});
        Object.defineProperty(this, 'dataFilesFetcher', {value: dataFilesFetcher});
    }

    ProblemFetcher.prototype.fetch = function(problemId) {
        var promise = new Promise(function(resolve) {
            var problem = {};
            return resolve(problem);
        });

        return promise
            .then((function(scope) {
                return function(problem) {
                    return (scope.specificationFetcher.fetch(problemId))
                        .then(function(specification) {
                            problem.specification = specification;
                            return problem;
                        });
                }
            })(this))

            .then((function(scope) {
                return function(problem) {
                    return (scope.dataFilesFetcher.fetch(problemId))
                        .then(function(dataFiles) {
                            problem.dataFiles = dataFiles;
                            return problem;
                        });
                }
            })(this))
        ;
    };

    this.ProblemFetcher = ProblemFetcher;
}).call(this);

module.exports = this.ProblemFetcher;