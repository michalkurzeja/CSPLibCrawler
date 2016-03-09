(function() {
    'use strict';

    function PageLoader() {
        Object.defineProperty(this, 'request', {value: require('request')});
    }

    PageLoader.prototype.loadHTML = function(url) {
        this.request.get(url, function(error, response, html) {
            if (!error) {
                return html;
            }

            throw 'Error loading page from [GET] ' + url;
        });
    };

    this.PageLoader = PageLoader;
}).call(this);

module.exports = this.PageLoader;
