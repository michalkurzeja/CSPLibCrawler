require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Service.Container');
use('swig');
var Promise = use('Bluebird');

module.exports.crawl = function() {
    init()
        .then(
            function() {
                return getService('doku.client').login()
            }
        )
        .then(
            function(result) {
                return result;
            },
            function(err) {
                console.log('Failure ' + err);
                throw err;
            }
        )
        .then(function() {
            var categoriesPublisher = getService('publisher.categories');

            return categoriesPublisher
                .publish()
                .then(function() {
                    return getService('publisher.problems').publish();
                })
                .then(function(problems) {
                    return getService('publisher.authors').publish(problems);
                })
                .then(function(problems) {
                    return getService('publisher.results').publish(problems);
                })
                .then(function(problems) {
                    return getService('publisher.data_files').publish(problems);
                })
            ;
        })
    ;
};

function init() {
    global.app.container = new Service.Container();
    getService('config.loader.parameters').load();

    setSwigFilters();

    return new Promise(function(resolve) {
        resolve();
    });
}

function setSwigFilters() {
    swig.setFilter('str2doku', function(input) {
        return input.toLowerCase().replace(/ /g, '-');
    });
    swig.setFilter('wrap_entities', function(input) {
        return input.replace(/(&.+?;)/g, '<html>$1</html>');
    });
    swig.setFilter('concat', function(input, string) {
        return '' + input + string;
    });
}