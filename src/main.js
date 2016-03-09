require('./Autoload/Autoloader.js')(__dirname);

GLOBAL.app = {};

use('Auth.Authenticator');
use('DataFetcher.ProblemFetcher');
use('Fs');

module.exports.crawl = function() {

    app.params = JSON.parse(Fs.readFileSync('../data/params.json', 'utf8'));

    process.argv.forEach(function (val, index, array) {
        if (val.indexOf('=') > -1) {
            var keyVal = val.replace(/-/g, '').split('=');
            app.params[keyVal[0]] = keyVal[1];
        }
    });

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