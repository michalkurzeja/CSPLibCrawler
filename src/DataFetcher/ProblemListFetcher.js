;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ProblemListFetcher(router) {
        Object.defineProperty(this, 'url', {
            value: router.url('%csplib.host%', 'csplib.problems')
        });
        DataFetcher.call(this);
    }

    ProblemListFetcher.prototype.fetch = function() {
        return DataFetcher.prototype.fetch.call(this, this.url);
    };

    ProblemListFetcher.prototype.extractData = function($) {
        return $('tr').slice(1).map(function(i, row) {
            return {
                problemId: $(row).children('td').find('a').text().trim()
            }
        }).toArray();
    };

    Util.inherits(ProblemListFetcher, DataFetcher);

    this.ProblemListFetcher = ProblemListFetcher;
}).call(this);

module.exports = this.ProblemListFetcher;