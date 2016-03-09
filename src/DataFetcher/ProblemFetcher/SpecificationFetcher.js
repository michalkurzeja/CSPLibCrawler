var util = require('util');

(function() {
    'use strict';

    var DataFetcher = app.DataFetcher.Abstraction.DataFetcher;

    function SpecificationFetcher(problemId) {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/prob' + problemId);
    }

    SpecificationFetcher.prototype.extractData = function($) {
        var specification = {};

        specification.name = getName($);
        specification.authors = getAuthors($);
        specification.specification = getSpecification($);

        return specification;
    };

    function getName($) {
        return $('h1').text().match(/\d+: (.*)/)[1];
    }

    function getAuthors($) {
        return $('.proposed').text().match(/Proposed by (.*)/)[1].split(',');
    }

    function getSpecification($) {
        return $('.container').children().not('.page-header, .proposed').map(function(i, element) {
            return $(element).html();
        }).toArray();
    }

    util.inherits(SpecificationFetcher, DataFetcher);

    this.SpecificationFetcher = SpecificationFetcher;
}).call(this);

module.exports = this.SpecificationFetcher;