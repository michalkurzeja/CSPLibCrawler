;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ReferencesFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    ReferencesFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url(getParameter('csplib.host'), 'csplib.problem.results', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    ReferencesFetcher.prototype.extractData = function($) {
        return 'references';
    };

    Util.inherits(ReferencesFetcher, DataFetcher);

    this.ReferencesFetcher = ReferencesFetcher;
}).call(this);

module.exports = this.ReferencesFetcher;
