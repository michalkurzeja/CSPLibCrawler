var util = require('util');

(function() {
    'use strict';

    var DataFetcher = require('./Abstraction/DataFetcher');

    function CategoryListFetcher() {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/categories.html');
    }

    util.inherits(CategoryListFetcher, DataFetcher);

    CategoryListFetcher.prototype.extractData = function($) {
        return $('h2.smaller').text();
    };

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;