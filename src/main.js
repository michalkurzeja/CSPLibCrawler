require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Service.Container');
use('Bluebird');

module.exports.crawl = function() {
    init()
        .then(
            function() {
                return getService('doku.authenticator').login()
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
        //        return getService('doku.page_uploader').editPage('problem:prob001', 'Hello Underworld! Hacked by Mich41 Kurz3j4', result.response.jar());
        //    }
        //)
        //.then(
        //    function(result) {
        //        return getService('doku.file_uploader').uploadFile('smallHorseA.jpg', {}, result.response.jar());
        //    }
        //)
        .then(
            function() {
                var fetcher = getService('data_fetcher.problem');

                return fetcher
                    .fetch('005')
                    .then(function(data) {
                        console.log(data.results);
                    });
            }
        )
        //.then(
        //    function() {
        //        var downloadsManager = getService('downloads_manager');
        //
        //        return downloadsManager
        //            .download('http://2f5op72faihm48ddaw17suvf.wpengine.netdna-cdn.com/wp-content/uploads/2016/01/mh5-7640185210_f483b16877_o.jpg')
        //            .then(function(stream) {
        //                console.log(stream);
        //            });
        //    }
        //)
    ;
};

function init() {
    global.app.container = new Service.Container();
    getService('config.loader.parameters').load();

    //var downloadsManager = getService('downloads_manager');
    //return downloadsManager.download('http://2f5op72faihm48ddaw17suvf.wpengine.netdna-cdn.com/wp-content/uploads/2016/01/mh5-7640185210_f483b16877_o.jpg');

    return new Bluebird(function(resolve) {
        resolve();
    });
}