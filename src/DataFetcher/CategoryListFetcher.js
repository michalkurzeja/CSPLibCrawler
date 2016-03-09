var util = require('util');

(function() {
    'use strict';

    var DataFetcher = require('./Abstraction/DataFetcher');

    function CategoryListFetcher() {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/categories.html');
    }

    CategoryListFetcher.prototype.extractData = function($) {
        return $('h2.smaller').text();
    };

    util.inherits(CategoryListFetcher, DataFetcher);

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;