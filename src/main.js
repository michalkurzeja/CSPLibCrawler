require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Auth.Authenticator');
use('DataFetcher.ProblemFetcher');
use('Service.Container');

module.exports.crawl = function() {
    init();

    var authenticator = new Auth.Authenticator('http://localhost/dokuwiki/doku.php?id=');

    authenticator
        .login()
        .then(
            function() {
                console.log('Success');
            },
            function(err) {
                console.log('Failure ' + err);
            }
        )
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