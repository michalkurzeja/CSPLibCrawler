;(function() {
    'use strict';

    var Promise = use("Bluebird");

    function ProblemFetcher(
        specificationFetcher, dataFilesFetcher, resultsFetcher, referencesFetcher, modelsFetcher, citeFetcher
    ) {
        Object.defineProperty(this, 'specificationFetcher', {value: specificationFetcher});
        Object.defineProperty(this, 'dataFilesFetcher', {value: dataFilesFetcher});
        Object.defineProperty(this, 'resultsFetcher', {value: resultsFetcher});
        Object.defineProperty(this, 'referencesFetcher', {value: referencesFetcher});
        Object.defineProperty(this, 'modelsFetcher', {value: modelsFetcher});
        Object.defineProperty(this, 'citeFetcher', {value: citeFetcher});
    }

    ProblemFetcher.prototype.fetch = function(problemId) {
        var promise = new Promise(function(resolve) {
            var problem = {};
            return resolve(problem);
        });

        return promise
            .then((function(scope) {
                return fetchPromise(scope.specificationFetcher.fetch(problemId), 'specification')
            })(this))
            .then((function(scope) {
                return fetchPromise(scope.dataFilesFetcher.fetch(problemId), 'dataFiles')
            })(this))
            .then((function(scope) {
                return fetchPromise(scope.resultsFetcher.fetch(problemId), 'results')
            })(this))
            .then((function(scope) {
                return fetchPromise(scope.referencesFetcher.fetch(problemId), 'references')
            })(this))
            .then((function(scope) {
                return fetchPromise(scope.modelsFetcher.fetch(problemId), 'models')
            })(this))
            .then((function(scope) {
                return fetchPromise(scope.citeFetcher.fetch(problemId), 'cite')
            })(this))
        ;
    };

    function fetchPromise(fetchPromise, key) {
        return function(problem) {
            return (fetchPromise)
                .then(function(results) {
                    problem[key] = results;
                    return problem;
                });
        }
    }

    this.ProblemFetcher = ProblemFetcher;
}).call(this);

module.exports = this.ProblemFetcher;