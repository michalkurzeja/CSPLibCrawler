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
                return getService('doku.authenticator').login()
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
        //.then(
        //    function(result) {
        //        return getService('doku.page_uploader').editPage('problem:prob001', 'Hello Underworld! Hacked by Mich41 Kurz3j4', result.response.jar());
        //    }
        //)
        //.then(
        //    function(result) {
        //        return getService('doku.file_uploader').uploadFile('smallHorseA.jpg', {}, result.response.jar());
        //    }
        //)
        .then(function(loginResult) {
            var cookieJar = loginResult.response.jar();
            var publisher = getService('publisher.problems');

            return publisher.publish(cookieJar);
        })
    ;
};

function init() {
    global.app.container = new Service.Container();
    getService('config.loader.parameters').load();

    swig.setFilter('str2doku', function(input) {
        return input.toLowerCase().replace(/ /g, '-');
    });

    return new Promise(function(resolve) {
        resolve();
    });
}