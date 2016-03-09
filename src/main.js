GLOBAL.app = require('auto-loader').load(__dirname);

app.params = {
    user: 'Kamil',
    password: 'Kamil1',
    lokiPath: 'http://localhost/dokuwiki/doku.php?id='
};

require("bluebird").promisifyAll(require("request"));

module.exports.crawl = function() {
    var authenticator = new app.Auth.Authenticator;

    authenticator
        .login()
        .then(function(data) {
            console.log(data);
        })
    ;
};