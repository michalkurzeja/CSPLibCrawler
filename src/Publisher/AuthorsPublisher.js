;(function() {
    "use strict";

    var Promise = use('Bluebird');

    function AuthorsPublisher(generator, client) {
        Object.defineProperty(this, 'generator', {value: generator});
        Object.defineProperty(this, 'client', {value: client});
    }

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
            });;
    };

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

    function getPageId(author) {
        return 'autor:' + author.toLowerCase().replace(/ /g, '-');
    }

    this.AuthorsPublisher = AuthorsPublisher;
}).call(this);

module.exports = this.AuthorsPublisher;