;(function() {
    "use strict";

    var Promise = use('Bluebird');

    function CategoriesPublisher(fetcher, generator, client) {
        Object.defineProperty(this, 'fetcher', {value: fetcher});
        Object.defineProperty(this, 'generator', {value: generator});
        Object.defineProperty(this, 'client', {value: client});
    }

    CategoriesPublisher.prototype.publish = function() {
        return this.fetcher
            .fetch()
            .then((function(scope) {
                return function(data) {
                    var promises = [];

                    for (var i in data) {
                        var pageId = 'kategoria:' + data[i].name.replace(/ /g, '-').toLowerCase();
                        var content = scope.generator.generate({data: data[i]});

                        promises.push(scope.client.editPage(pageId, content));
                    }

                    return Promise.all(promises);
                }
            })(this));
    };

    this.CategoriesPublisher = CategoriesPublisher;
}).call(this);

module.exports = this.CategoriesPublisher;