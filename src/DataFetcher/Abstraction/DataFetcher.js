(function() {
    'use strict';

    function DataFetcher() {}

    DataFetcher.prototype.fetch = function() {
        console.log( this.constructor.name + '::fetch()');
    };

    this.DataFetcher = DataFetcher;
}).call(this);

module.exports = this.DataFetcher;