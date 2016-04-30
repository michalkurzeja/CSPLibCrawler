;(function() {
    "use strict";

    var CategoryListFetcher = use('DataFetcher.CategoryListFetcher');
    var Util                = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function ProblemCategoriesFetcher(router) {
        CategoryListFetcher.call(this, router);
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
