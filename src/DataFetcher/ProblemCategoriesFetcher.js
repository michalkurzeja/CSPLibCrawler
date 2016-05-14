;(function() {
    "use strict";

    var CategoryListFetcher = use('DataFetcher.CategoryListFetcher');
    var Util                = use('Util');

    /**
     * @constructor
     * @param {HttpClient} httpClient
     * @param {DokuHttpDownloaderFile} fileDownloader
     * @param {Router} router
     */
    function ProblemCategoriesFetcher(httpClient, fileDownloader, router) {
        CategoryListFetcher.call(this, httpClient, fileDownloader, router);
    }

    /**
     * @public
     * @returns {Promise}
     */
    ProblemCategoriesFetcher.prototype.fetch = function() {
        return CategoryListFetcher.prototype.fetch.call(this, this.url)
            .then(function(data) {
                var problemCategories = {};

                for (var i in data) {
                    var category = data[i];

                    for (var j in category.problems) {
                        var problem = category.problems[j];

                        if (typeof problemCategories[problem] === 'undefined') {
                            problemCategories[problem] = [];
                        }

                        problemCategories[problem].push(category.name);
                    }
                }

                return problemCategories;
            });
    };

    Util.inherits(ProblemCategoriesFetcher, CategoryListFetcher);

    this.ProblemCategoriesFetcher = ProblemCategoriesFetcher;
}).call(this);

module.exports = this.ProblemCategoriesFetcher;
