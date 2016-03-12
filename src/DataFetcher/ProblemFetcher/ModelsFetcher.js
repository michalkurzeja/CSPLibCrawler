;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ModelsFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    ModelsFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url(getParameter('csplib.host'), 'csplib.problem.models', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    ModelsFetcher.prototype.extractData = function($) {
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

    Util.inherits(ModelsFetcher, DataFetcher);

    this.ModelsFetcher = ModelsFetcher;
}).call(this);

module.exports = this.ModelsFetcher;
