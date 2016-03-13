require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Service.Container');
use('Bluebird');

module.exports.crawl = function() {
    init()
        .then(
            function() {
                return getService('Doku.Authenticator').login()
            }
        )
        .then(
            function(result) {
                console.log('Success');
                return result;
            },
            function(err) {
                console.log('Failure ' + err);
                throw err;
            }
        )
        //.then(
        //    function(result) {
        //        return getService('Doku.PageUploader').editPage('problem:prob001', 'Hello Underworld! Hacked by Mich41 Kurz3j4', result.response.jar());
        //    }
        //)
        //.then(
        //    function(result) {
        //        return getService('Doku.FileUploader').uploadFile('smallHorseA.jpg', {}, result.response.jar());
        //    }
        //)
        .then(
            function() {
                var fetcher = getService('data_fetcher.problem');

                return fetcher
                    .fetch('005')
                    .then(function(data) {
                        console.log(data);
                    });
            }
        )
    ;
};

function init() {
    global.app.container = new Service.Container();
    getService('config.loader.parameters').load();

    return new Bluebird(function(resolve) {
        resolve();
    });
}