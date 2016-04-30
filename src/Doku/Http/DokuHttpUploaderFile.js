;(function() {
    'use strict';

    var Cheerio    = use('Cheerio');
    var Fs         = use('Fs');
    var Promise    = use('Bluebird');

    /**
     * @constructor
     */
    function DokuHttpUploaderFile(router, dokuHttpClient) {
        Object.defineProperty(this, 'router', {
            value: router
        });

        Object.defineProperty(this, 'dokuHttpClient', {
            value: dokuHttpClient
        });
    }

    /**
     * @public
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
                                    reject(err);
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