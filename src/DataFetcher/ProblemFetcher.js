;(function() {
    'use strict';

    var Promise = use("Bluebird");

    /**
     * @constructor
     * @param {SpecificationFetcher} specificationFetcher
     * @param {DataFilesFetcher} dataFilesFetcher
     * @param {ResultsFetcher} resultsFetcher
     * @param {ReferencesFetcher} referencesFetcher
     * @param {ModelsFetcher} modelsFetcher
     * @param {CiteFetcher} citeFetcher
     */
    function ProblemFetcher(
        specificationFetcher, dataFilesFetcher, resultsFetcher, referencesFetcher, modelsFetcher, citeFetcher
    ) {

        /**
         * @private
         * @member {SpecificationFetcher} specificationFetcher
         */
        Object.defineProperty(this, 'specificationFetcher', {
            value: specificationFetcher
        });

        /**
         * @private
         * @member {DataFilesFetcher} dataFilesFetcher
         */
        Object.defineProperty(this, 'dataFilesFetcher', {
            value: dataFilesFetcher
        });

        /**
         * @private
         * @member {ResultsFetcher} resultsFetcher
         */
        Object.defineProperty(this, 'resultsFetcher', {
            value: resultsFetcher
        });

        /**
         * @private
         * @member {ReferencesFetcher} referencesFetcher
         */
        Object.defineProperty(this, 'referencesFetcher', {
            value: referencesFetcher
        });

        /**
         * @private
         * @member {ModelsFetcher} modelsFetcher
         */
        Object.defineProperty(this, 'modelsFetcher', {
            value: modelsFetcher
        });

        /**
         * @private
         * @member {CiteFetcher} citeFetcher
         */
        Object.defineProperty(this, 'citeFetcher', {
            value: citeFetcher
        });
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
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

    /**
     * @private
     * @param {Promise} fetchPromise
     * @param {string} key
     * @returns {Function}
     */
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