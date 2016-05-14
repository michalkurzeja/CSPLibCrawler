;(function() {
    'use strict';

    var Fs       = use('Fs');
    var Util     = use('Util');
    var Promise  = use('Bluebird');

    function DokuHttpDownloaderFile(dokuHttpClient) {
        /**
         * @private
         * @member {httpClient} client
         */
        Object.defineProperty(this, 'client', {
            value: dokuHttpClient
        });

        /**
         * @private
         * @member {string} mediaDir
         */
        Object.defineProperty(this, 'mediaDir', {
            value: getParameter('dokuwiki.media.dir')
        });
    }

    DokuHttpDownloaderFile.prototype.download = function (url, filename, prefix) {
        var scope = this;

        return this.client.get(url, {'encoding': 'binary'})
            .then(function(response) {
                if (typeof prefix === 'undefined') {
                    prefix = '';
                } else {
                    prefix = prefix + '_'
                }

                var path = Util.format('%s/%s%s', scope.mediaDir, prefix.toLowerCase(), filename.toLowerCase());

                return new Promise(function(resolve) {
                    Fs.writeFile(path, response.body, 'binary');
                    resolve();
                });
            });
    };

    this.DokuHttpDownloaderFile = DokuHttpDownloaderFile;
}).call(this);

module.exports = this.DokuHttpDownloaderFile;