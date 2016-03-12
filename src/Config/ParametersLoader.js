;(function() {
    "use strict";

    use('Fs');

    const PARAMETERS_PATH = global.app.rootDir + '/../config/params.json';

    function ParametersLoader() {}

    ParametersLoader.prototype.load = function() {
        global.app.params = JSON.parse(Fs.readFileSync(PARAMETERS_PATH, 'utf8'));

        process.argv.forEach(function (val) {
            if (val.indexOf('=') > -1) {
                var keyVal = val.replace(/-/g, '').split('=');
                global.app.params[keyVal[0]] = keyVal[1];
            }
        });
    };

    this.ParametersLoader = ParametersLoader;
}).call(this);

module.exports = this.ParametersLoader;