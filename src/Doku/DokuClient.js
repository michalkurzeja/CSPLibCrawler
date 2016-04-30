;(function() {
    'use strict';

    var DokuHttpClient       = use('Doku.Http.DokuHttpClient');
    var DokuHttpUploaderFile = use('Doku.Http.DokuHttpUploaderFile');
    var DokuHttpUploaderPage = use('Doku.Http.DokuHttpUploaderPage');

    /**
     * @constructor
     */
    function DokuClient(httpClient, httpUploaderFile, httpUploaderPage) {

        /**
         * @private
         * @var {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpClient', {
            value: httpClient
        });

        /**
         * @private
         * @var {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpUploaderFile', {
            value: httpUploaderFile
        });

        /**
         * @private
         * @var {HttpClient} httpClient
         */
        Object.defineProperty(this, 'httpUploaderPage', {
            value: httpUploaderPage
        });
    }

    /**
     * @public
     * @return {Promise}
     */
    DokuClient.prototype.login = function() {
        return this.httpClient.login();
    };

    /**
     * @public
     * @param {string} fileName
     * @param {Buffer} fileBinary
     * @return {Promise}
     */
    DokuClient.prototype.editFile = function(fileName, fileBinary) {
        return this.httpUploaderFile.editFile(fileName, fileBinary);
    };

    /**
     * @public
     * @param {string} id
     * @param {string} text
     * @return {Promise}
     */
    DokuClient.prototype.editPage = function(id, text) {
        return this.httpUploaderPage.editPage(id, text);
    };

    this.DokuClient = DokuClient;
}).call(this);

module.exports = this.DokuClient;