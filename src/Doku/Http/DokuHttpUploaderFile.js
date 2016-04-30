;(function() {
    'use strict';

    var Cheerio    = use('Cheerio');
    var Fs         = use('Fs');
    var Promise    = use('Bluebird');

    /**
     * @constructor
     * @param {Router} router
     * @param {DokuHttpClient} dokuHttpClient
     */
    function DokuHttpUploaderFile(router, dokuHttpClient) {

        /**
         * @private
         * @member {Router} router
         */
        Object.defineProperty(this, 'router', {
            value: router
        });

        /**
         * @private
         * @member {DokuHttpClient} dokuHttpClient
         */
        Object.defineProperty(this, 'dokuHttpClient', {
            value: dokuHttpClient
        });
    }

    /**
     * @public
     * @param {string} fileName
     * @param {Buffer} fileBinary
     */
    DokuHttpUploaderFile.prototype.editFile = function(fileName, fileBinary) {
        var client = this.dokuHttpClient;
        var url = this.router.url(getParameter('dokuwiki.host'), 'dokuwiki.file');
        var promise = this.dokuHttpClient.get(url);

        return promise
            .then(
                function(response) {
                    return {
                        response: response,
                        data: extractData(Cheerio.load(response.body))
                    };
                }
            )
            .then(
                function(result) {
                    return new Promise(function(resolve, reject) {
                        Fs.readFile(
                            '/home/skie/Desktop/smallHorse/smallHorse.jpg',
                            'binary',
                            function (err, data) {
                                if (err) {
                                    return reject(err);
                                }

                                client.post(
                                    url,
                                    {
                                        headers: {
                                            'X-Requested-With': 'XMLHttpRequest',
                                            'X-File-Name': fileName,
                                            'Content-Type': 'application/octet-stream',
                                            'Content-Length': '114220'
                                            //'Connection': 'keep-alive',
                                            //'Transfer-Encoding': 'chunked'
                                        },
                                        body: data,
                                        form: {
                                            tab_files: 'files',
                                            tab_details: 'view',
                                            call: 'mediaupload',
                                            mediaid: '',
                                            ns: 'problem',
                                            ow: 'checked',
                                            qqfile: fileName,
                                            sectok: result.data.sectok
                                        }
                                    },
                                    result.response.jar()
                                )
                                .then(
                                    function(result) {
                                        resolve(result);
                                    },
                                    function(err) {
                                        console.log(err);
                                    }
                                )
                            }
                        );
                    });
                }
            )
            .then(
                function(response) {
                    console.log(response.body);

                    return {
                        response: response,
                        data: {}
                    }
                }
            )
        ;
    };

    /**
     * @private
     * @param {Cheerio} $
     * @return {object}
     */
    function extractData($) {
        var $form = $('#media__content');

        return {
            sectok: $form.find('input[name=sectok]').val()
        };
    }

    this.DokuHttpUploaderFile = DokuHttpUploaderFile;
}).call(this);

module.exports = this.DokuHttpUploaderFile;