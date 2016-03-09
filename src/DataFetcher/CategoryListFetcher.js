var util = require('util');
var DataFetcher = require('./Abstraction/DataFetcher');

(function() {
    'use strict';

    function CategoryListFetcher() {
        DataFetcher.call(this);
    }

    util.inherits(CategoryListFetcher, DataFetcher);

    //CategoryListFetcher.prototype.fetch = function() {
    //
    //};

    this.CategoryListFetcher = CategoryListFetcher;
}).call(this);

module.exports = this.CategoryListFetcher;