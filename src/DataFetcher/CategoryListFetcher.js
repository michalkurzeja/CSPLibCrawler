var util = require('util');

(function() {
    'use strict';

    var DataFetcher = app.DataFetcher.Abstraction.DataFetcher;

    function CategoryListFetcher() {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/categories.html');
    }

    CategoryListFetcher.prototype.extractData = function($) {
        return $('h2.smaller').map(function(index, element) {
            return $(element).text();
        }).toArray();
    };

    util.inherits(CategoryListFetcher, DataFetcher);

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;