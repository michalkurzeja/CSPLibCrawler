;(function() {
    "use strict";

    var Promise = use('Bluebird');
    use('fs');
    use('tmp');

    function DownloadsManager(httpClient) {
        Object.defineProperty(this, 'httpClient', {value: httpClient});
        Object.defineProperty(this, 'filenameMap', {value: {}});
    }

    DownloadsManager.prototype.downloadText = function(url) {
        return this.download(url, null);
    };

    DownloadsManager.prototype.downloadBinary = function(url) {
        return this.download(url, 'binary');
    };

    DownloadsManager.prototype.download = function(url, encoding) {
        return this.httpClient.get(url, false, encoding)
            .then((function(scope) {
                return function(response) {
                    var tmpFile = tmp.fileSync();

                    fs.writeFile(tmpFile.name, response.body, encoding);
                    scope.filenameMap[tmpFile.name] = parseFilename(url);

                    return fs.createReadStream(tmpFile.name);
                }
            })(this));
    };

    function parseFilename(url) {
        return url.slice(url.lastIndexOf('/')+1);
    }

    this.DownloadsManager = DownloadsManager;
}).call(this);

module.exports = this.DownloadsManager;