;(function() {
    "use strict";

    var Fs = use('Fs');

    const PARAMETERS_PATH = global.appRoot + '/../config/params.json';

    var load = function() {
        global.app.params = JSON.parse(Fs.readFileSync(PARAMETERS_PATH, 'utf8'));

        process.argv.forEach(function (val, index, array) {
            if (val.indexOf('=') > -1) {
                var keyVal = val.replace(/-/g, '').split('=');
                global.app.params[keyVal[0]] = keyVal[1];
            }
        });
    };

    this.load = load;
}).call(this);

module.exports = {load: this.load};