;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function DataFilesFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        DataFetcher.call(this);
    }

    DataFilesFetcher.prototype.fetch = function(problemId) {
        var route = this.router.url(getParameter('csplib.host'), 'csplib.problem.data_files', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, route);
    };

    DataFilesFetcher.prototype.extractData = function($) {
        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $dataFile = $(dataFile);

            return {
                filename: $dataFile.children('td').first().text().trim()
            };
        }).toArray();
    };

    Util.inherits(DataFilesFetcher, DataFetcher);

    this.DataFilesFetcher = DataFilesFetcher;
}).call(this);

module.exports = this.DataFilesFetcher;
