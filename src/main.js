require('./Autoload/Autoloader.js')(__dirname);

global.app = {};
global.app.rootDir = require('path').resolve(__dirname);

use('Auth.Authenticator');
use('DataFetcher.ProblemFetcher');
use('Fs');
use('Config.ParametersLoader');
use('Service.Container');

module.exports.crawl = function() {
    init();

    var authenticator = new Auth.Authenticator();

    authenticator
        .login()
        .then(
            function() {
                console.log('Success');
            },
            function() {
                console.log('Failure');
            }
        )
        .then(function() {
            var fetcher = new DataFetcher.ProblemFetcher('012');

            return fetcher
                .fetch()
                .then(function(data) {
                    console.log(data);
                });
        })
    ;
};

function init() {
    "use strict";

    new Config.ParametersLoader().load();
    global.app.container = new Service.Container();
}