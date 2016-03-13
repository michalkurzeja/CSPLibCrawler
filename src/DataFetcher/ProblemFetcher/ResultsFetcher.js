;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ResultsFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    ResultsFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem.results', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    ResultsFetcher.prototype.extractData = function($) {
        return {
            files: getFiles($),
            description: getDescription($)
        }
    };

    function getFiles($) {
        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            return {
                filename: $td.first().text().trim(),
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim()
            };
        }).toArray();
    }

    function getDescription($) {
        return $('.container').children('p').not('.bib').map(function(i, paragraph) {
            return $(paragraph).text();
        }).toArray()
    }

    Util.inherits(ResultsFetcher, DataFetcher);

    this.ResultsFetcher = ResultsFetcher;
}).call(this);

module.exports = this.ResultsFetcher;
