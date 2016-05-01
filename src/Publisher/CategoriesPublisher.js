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
                    var completed = 0;
                    var totalLength = data.length;

                    process.stdout.write('Categories: 0%\r');

                    for (var i in data) {
                        var pageId = 'kategoria:' + data[i].name.replace(/ /g, '-').toLowerCase();
                        var content = scope.generator.generate({data: data[i]});

                        var promise = scope.client
                            .editPage(pageId, content)
                            .then(function(data) {
                                process.stdout.write('Categories: ' + Math.round((++completed / totalLength) * 100) + '%\r');
                                return data;
                            });

                        promises.push(promise);
                    }

                    return Promise
                        .all(promises)
                        .then(function(data) {
                            process.stdout.write('\n');
                            return data;
                        });
                }
            })(this));
    };

    this.CategoriesPublisher = CategoriesPublisher;
}).call(this);

module.exports = this.CategoriesPublisher;