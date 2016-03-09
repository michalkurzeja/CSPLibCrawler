;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function CategoryListFetcher() {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/categories.html');
    }

    CategoryListFetcher.prototype.extractData = function($) {
        return $('h2.smaller').map(function(i, category) {
            var $category = $(category);
            var problems = $category.next('table').find('a').map(function(i, problem) {
                var $problem = $(problem);

                return $problem.text().trim();
            }).toArray();

            return {
                name: $category.text(),
                problems: problems
            }
        }).toArray();
    };

    Util.inherits(CategoryListFetcher, DataFetcher);

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;