;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function DataFilesFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    DataFilesFetcher.prototype.fetch = function(problemId) {
        var url = this.router.url('%csplib.host%', 'csplib.problem.data_files', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    DataFilesFetcher.prototype.extractData = function($) {
        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            return {
                filename: $td.first().text().trim(),
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim()
            };
        }).toArray();
    };

    Util.inherits(DataFilesFetcher, DataFetcher);

    this.DataFilesFetcher = DataFilesFetcher;
}).call(this);

module.exports = this.DataFilesFetcher;
