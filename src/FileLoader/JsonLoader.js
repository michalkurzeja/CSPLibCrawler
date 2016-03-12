;(function() {
    "use strict";

    use('Fs');

    const ENCODING_UTF8 = 'utf8';

    function JsonLoader() {}

    JsonLoader.prototype.load = function(fileName, encoding) {
        if (!encoding) {
            encoding = ENCODING_UTF8;
        }

        return JSON.parse(Fs.readFileSync(fileName, encoding));
    };

    this.JsonLoader = JsonLoader;
}).call(this);

module.exports = this.JsonLoader;
