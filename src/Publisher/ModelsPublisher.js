;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {DataFileContentGenerator} generator
     * @param {DokuClient} client
     */
    function ModelsPublisher(generator, client) {

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
    ModelsPublisher.prototype.publish = function(problemsData) {
        var promises = [];

        for (var i in problemsData) {
            var models = problemsData[i].models;

            for (var j in models.files) {
                var problemId = problemsData[i].id;
                var modelFile = models.files[j];

                var content = this.generator.generate({
                    problem: {
                        id: problemId,
                        name: problemsData[i].specification.name
                    },
                    model: modelFile
                });

                var pageId = getPageId(problemId, modelFile);

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
     * @param {object} result
     * @returns {string}
     */
    function getPageId(problemId, result) {
        return 'rozwiazanie:' + problemId + ':' + result.filename.toLowerCase().replace(/ /g, '-');
    }

    this.ModelsPublisher = ModelsPublisher;
}).call(this);

module.exports = this.ModelsPublisher;