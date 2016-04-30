;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ReferencesFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    ReferencesFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem.references', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    ReferencesFetcher.prototype.extractData = function($) {
        return {
            bibtex: getBibtex($),
            description: getDescription($),
            references: getReferences($)
        };
    };

    function getBibtex($) {
        return getParameter('csplib.host') + $('.container').find('p').first().find('a').attr('href');
    }

    function getDescription($) {
        return $('.container').children('p').not('.bib').slice(1).map(function(i, paragraph) {
            return $(paragraph).text();
        }).toArray();
    }

    function getReferences($) {
        var refs = $('.bib').map(function(i, reference) {
            var $ref = $(reference);

            var links = $ref.find('.links').find('a').map(function(i, anchor) {
                var $a = $(anchor);

                return {
                    label: $a.text().trim(),
                    url: $a.attr('href')
                };
            }).toArray();

            return {
                bibkey: $ref.find('.bibkey').text().trim(),
                authors: getAuthors($ref),
                title: $ref.find('.title').text().trim(),
                url: $ref.find('.title').find('a').attr('href'),
                venueType: $ref.find('.venuetype').text().trim(),
                venue: $ref.find('.venue').text().trim(),
                date: $ref.find('.date').text().trim(),
                links: links
            };
        }).toArray();

        return refs;
    }

    function getAuthors($ref) {
        var authors = $ref.find('.authors').text().trim().split(', ');

        authors[authors.length-1] = authors[authors.length-1].replace('and ', '');

        return authors;
    }

    Util.inherits(ReferencesFetcher, DataFetcher);

    this.ReferencesFetcher = ReferencesFetcher;
}).call(this);

module.exports = this.ReferencesFetcher;
