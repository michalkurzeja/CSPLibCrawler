GLOBAL.app = require('auto-loader').load(__dirname);

require("bluebird").promisifyAll(require("request"));

module.exports.crawl = function() {
    app.params = JSON.parse(require('fs').readFileSync('../data/params.json', 'utf8'));

    process.argv.forEach(function (val, index, array) {
        if (val.indexOf('=') > -1) {
            var keyVal = val.replace(/-/g, '').split('=');
            app.params[keyVal[0]] = keyVal[1];
        }
    });

    var authenticator = new app.Auth.Authenticator;

    authenticator
        .login()
        .then(function(data) {
            console.log('Success');
        })
    ;
};