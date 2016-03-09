var util = require('util');

(function() {
    'use strict';

    var DataFetcher = app.DataFetcher.Abstraction.DataFetcher;

    function DataFilesFetcher(problemId) {
        DataFetcher.call(this, 'http://www.csplib.org/Problems/prob' + problemId + '/data');
    }

    DataFilesFetcher.prototype.extractData = function($) {
        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $dataFile = $(dataFile);

            return {
                filename: $dataFile.children('td').first().text().trim()
            };
        }).toArray();
    };

    util.inherits(DataFilesFetcher, DataFetcher);

    this.DataFilesFetcher = DataFilesFetcher;
}).call(this);

module.exports = this.DataFilesFetcher;
