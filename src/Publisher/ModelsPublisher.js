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
        var completed = 0;
        var totalSize = getTotalSize(problemsData);

        process.stdout.write('Models: 0%\r');

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

                var promise = this.client
                    .editPage(pageId, content)
                    .then(function (data) {
                        process.stdout.write('Models: ' + Math.round((++completed / totalSize) * 100) + '%\r');
                        return data;
                    });

                promises.push(promise);
            }
        }

        return Promise
            .all(promises)
            .then(function(data) {
                process.stdout.write('\n');
                return data;
            })
            .then(function() {
                return new Promise(function(resolve) {
                    return resolve(problemsData);
                });
            });
    };

    function getTotalSize(problemsData) {
        var size = 0;

        for (var i in problemsData) {
            size += problemsData[i].models.files.length;
        }

        return size;
    }

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