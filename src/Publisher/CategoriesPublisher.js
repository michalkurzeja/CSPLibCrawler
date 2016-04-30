;(function() {
    "use strict";

    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param fetcher
     * @param generator
     * @param client
     */
    function CategoriesPublisher(fetcher, generator, client) {

        /**
         * @private
         * @member fetcher
         */
        Object.defineProperty(this, 'fetcher', {
            value: fetcher
        });

        /**
         * @private
         * @member generator
         */
        Object.defineProperty(this, 'generator', {
            value: generator
        });

        /**
         * @private
         * @member client
         */
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    /**
     * @public
     * @returns {Promise}
     */
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