(function() {
    'use strict';

    var Promise = require("bluebird");
    var SpecificationFetcher = require('./ProblemFetcher/SpecificationFetcher');
    var DataFilesFetcher = require('./ProblemFetcher/DataFilesFetcher');

    function ProblemFetcher(problemId) {
        Object.defineProperty(this, 'problemId', {value: problemId});
    }

    ProblemFetcher.prototype.fetch = function() {
        var problemId = this.problemId;

        var promise = new Promise(function(resolve) {
            var problem = {};
            return resolve(problem);
        });

        return promise
            .then(function (problem) {
                return (new SpecificationFetcher(problemId))
                    .fetch()
                    .then(function(specification) {
                        problem.specification = specification;
                        return problem;
                    })
            })
            .then(function(problem) {
                return (new DataFilesFetcher(problemId))
                    .fetch()
                    .then(function(dataFiles) {
                        problem.dataFiles = dataFiles;
                        return problem;
                    });
            });
    };

    this.ProblemFetcher = ProblemFetcher;
}).call(this);

module.exports = this.ProblemFetcher;
