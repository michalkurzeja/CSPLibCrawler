(function() {
    'use strict';

    var request = require('request');

    function PageLoader() {}

    PageLoader.prototype.loadHTML = function(url) {
        return request.getAsync(url);
    };

    this.PageLoader = PageLoader;
}).call(this);

module.exports = this.PageLoader;
