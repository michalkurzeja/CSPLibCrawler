var util = require('util');

(function() {
    'use strict';

    var DataFetcher = require('./Abstraction/DataFetcher');

    function CategoryListFetcher() {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/categories.html');
    }

    util.inherits(CategoryListFetcher, DataFetcher);

    CategoryListFetcher.prototype.fetch = function() {
        console.log($('h2.smaller').text());
    };

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;