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
        return getCite($('pre').first().text().trim());
    }

    function getCspLibCite($) {
        return getCite($('pre').last().text().trim());
    }

    function getCite(text) {
        return '\n\t' + text.replace(/\n/g, '\n\t');
    }

    Util.inherits(CiteFetcher, DataFetcher);

    this.CiteFetcher = CiteFetcher;
}).call(this);

module.exports = this.CiteFetcher;
