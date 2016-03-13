;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function CategoryListFetcher(router) {
        Object.defineProperty(this, 'url', {
            value: router.url('%csplib.host%', 'csplib.categories')
        });
        DataFetcher.call(this);
    }

    CategoryListFetcher.prototype.fetch = function() {
        return DataFetcher.prototype.fetch.call(this, this.url);
    };

    CategoryListFetcher.prototype.extractData = function($) {
        return $('h2.smaller').map(function(i, category) {
            return {
                name: $(category).text()
            }
        }).toArray();
    };

    Util.inherits(CategoryListFetcher, DataFetcher);

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;