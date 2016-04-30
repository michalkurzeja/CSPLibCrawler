;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {AuthorContentGenerator} generator
     * @param {DokuClient} client
     */
    function AuthorsPublisher(generator, client) {

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
    AuthorsPublisher.prototype.publish = function(problemsData) {
        var authors = extractAuthors(problemsData);
        var promises = [];

        for (var i in authors) {
            var author = authors[i];
            var content = this.generator.generate({author: author});

            promises.push(this.client.editPage(getPageId(author), content));
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
     * @param {object} problemsData
     * @returns {object}
     */
    function extractAuthors(problemsData) {
        var data = {};

        for (var i in problemsData) {
            for (var j in problemsData[i].specification.authors) {
                var author = problemsData[i].specification.authors[j];
                data[author] = author;
            }
        }

        return data;
    }

    /**
     * @private
     * @param {string} author
     * @returns {string}
     */
    function getPageId(author) {
        return 'autor:' + author.toLowerCase().replace(/ /g, '-');
    }

    this.AuthorsPublisher = AuthorsPublisher;
}).call(this);

module.exports = this.AuthorsPublisher;