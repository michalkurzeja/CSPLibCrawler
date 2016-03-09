var util = require('util');

(function() {
    'use strict';

    var DataFetcher = app.DataFetcher.Abstraction.DataFetcher;

    function ProblemFetcher(problemId) {
        Object.defineProperty(this, 'problemId', {value: problemId});
        DataFetcher.call(this, 'http://www.csplib.org/Problems/prob' + problemId);
    }

    ProblemFetcher.prototype.extractData = function($) {

    };

    util.inherits(ProblemFetcher, DataFetcher);

    this.ProblemFetcher = ProblemFetcher;
}).call(this);

module.exports = this.ProblemFetcher;
