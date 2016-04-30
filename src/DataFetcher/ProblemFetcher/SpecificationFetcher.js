;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    /**
     * @constructor
     * @param {Router} router
     */
    function SpecificationFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    /**
     * @public
     * @param {string} problemId
     * @returns {Promise}
     */
    SpecificationFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    /**
     * @protected
     * @param {Cheerio} $
     * @returns {object}
     */
    SpecificationFetcher.prototype.extractData = function($) {
        var specification = {};

        specification.name = getName($);
        specification.authors = getAuthors($);
        specification.specification = getSpecification($);

        return specification;
    };

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string}
     */
    function getName($) {
        return $('h1').text().match(/\d+: (.*)/)[1];
    }

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string[]}
     */
    function getAuthors($) {
        return $('.proposed').text().match(/Proposed by (.*)/)[1].split(',');
    }

    /**
     * @private
     * @param {Cheerio} $
     * @returns {string[]}
     */
    function getSpecification($) {
         return $('.container').children().not('.page-header, .proposed').map(function(i, element) {
            var $element = $(element);

            return $element.wrap('<div></div>').parent().html();
        }).toArray();
    }

    Util.inherits(SpecificationFetcher, DataFetcher);

    this.SpecificationFetcher = SpecificationFetcher;
}).call(this);

module.exports = this.SpecificationFetcher;
