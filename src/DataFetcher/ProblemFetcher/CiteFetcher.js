;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function CiteFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    CiteFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem.cite', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    CiteFetcher.prototype.extractData = function($) {
        return {
            problem: getProblemCite($),
            csplib: getCspLibCite($)
        }
    };

    function getProblemCite($) {
        return $('pre').first().text().trim();
    }

    function getCspLibCite($) {
        return $('pre').last().text().trim();
    }

    Util.inherits(CiteFetcher, DataFetcher);

    this.CiteFetcher = CiteFetcher;
}).call(this);

module.exports = this.CiteFetcher;
