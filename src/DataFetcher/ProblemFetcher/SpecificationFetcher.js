;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function SpecificationFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    SpecificationFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

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

    Util.inherits(SpecificationFetcher, DataFetcher);

    this.SpecificationFetcher = SpecificationFetcher;
}).call(this);

module.exports = this.SpecificationFetcher;
