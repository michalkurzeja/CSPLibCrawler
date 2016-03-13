;(function() {
    'use strict';

    var DataFetcher = use('DataFetcher.Abstraction.DataFetcher');
    var Util        = use('Util');

    function ModelsFetcher(router) {
        Object.defineProperty(this, 'router', {value: router});
        Object.defineProperty(this, 'problemId', {value: null, writable: true});
        DataFetcher.call(this);
    }

    ModelsFetcher.prototype.fetch = function(problemId) {
        this.problemId = problemId;
        var url = this.router.url('%csplib.host%', 'csplib.problem.models', {problemId: problemId});
        return DataFetcher.prototype.fetch.call(this, url);
    };

    ModelsFetcher.prototype.extractData = function($) {
        return {
            files: getFiles.call(this, $),
            description: getDescription($)
        }
    };

    function getFiles($) {
        var scope = this;

        return $('table.tablesorter > tbody').find('tr').map(function(i, dataFile) {
            var $td = $(dataFile).children('td');

            return {
                filename: $td.first().text().trim(),
                type: $td.eq(1).text().trim(),
                notes: $td.last().text().trim(),
                file: getFile.call(scope, $td.first().children('a'))
            };
        }).toArray();
    }

    function getFile($a) {
        return this.router.url('%csplib.host%', 'csplib.problem.models.file', {problemId: this.problemId, fileName: $a.text().trim()})
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
