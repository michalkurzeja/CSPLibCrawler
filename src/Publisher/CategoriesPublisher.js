;(function() {
    "use strict";

    var Promise = use('Bluebird');

    function CategoriesPublisher(fetcher, generator, pageUploader) {
        Object.defineProperty(this, 'fetcher', {value: fetcher});
        Object.defineProperty(this, 'generator', {value: generator});
        Object.defineProperty(this, 'pageUploader', {value: pageUploader});
    }

    CategoriesPublisher.prototype.publish = function(cookieJar) {
        return this.fetcher
            .fetch()
            .then((function(scope) {
                return function(data) {
                    var promises = [];

                    for (var i in data) {
                        var pageId = 'kategoria:' + data[i].name.replace(' ', '-').toLowerCase();
                        var content = scope.generator.generate({data: data[i]});

                        promises.push(scope.pageUploader.editPage(pageId, content, cookieJar));
                    }

                    return Promise.all(promises);
                }
            })(this));
    };

    this.CategoriesPublisher = CategoriesPublisher;
}).call(this);

module.exports = this.CategoriesPublisher;