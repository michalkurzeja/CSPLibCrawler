require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Auth.Authenticator');
use('Loki.PageEditor');
use('Service.Container');
var Promise = use('Bluebird');

module.exports.crawl = function() {
    init();

    //var authenticator = new Auth.Authenticator('http://localhost/dokuwiki/doku.php?id=');
    //var pageEditor = new Loki.PageEditor('http://localhost/dokuwiki/doku.php?id=');

    var authenticator = new Promise(function(resolve) {
        resolve();
    });

    authenticator
        //.login()
        //.then(
        //    function(result) {
        //        console.log('Success');
        //        return result;
        //    },
        //    function(err) {
        //        console.log('Failure ' + err);
        //        throw err;
        //    }
        //)
        //.then(
        //    function(result) {
        //        return pageEditor.editPage('problem:prob002', 'Hello World! Hacked by Michal Kurzeja', result.response.jar());
        //    }
        //)
        .then(function() {
            var fetcher = getService('data_fetcher.problem');

            return fetcher
                .fetch('012')
                .then(function(data) {
                    console.log(data);
                });
        })
    ;
};

function init() {
    "use strict";

    global.app.container = new Service.Container();
    getService('config.loader.parameters').load();
}