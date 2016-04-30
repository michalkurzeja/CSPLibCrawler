;(function() {
    'use strict';

    var HttpClient = use('Http.HttpClient');
    var Cheerio    = use('Cheerio');
    var Fs         = use('Fs');
    var Needle     = use('Needle');
    var Promise    = use('Bluebird');

    /**
     * @constructor
     */
    function FileUploader(router) {
        Object.defineProperty(this, 'router', {
            value: router
        });
    }

    /**
     * @public
     */
    FileUploader.prototype.uploadFile = function(fileName, fileBinary, cookieJar) {
        var url = this.router.url(getParameter('dokuwiki.host'), 'dokuwiki.file');
        var promise = (new HttpClient).get(url, {}, cookieJar);

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

                                (new HttpClient).post(
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

    this.FileUploader = FileUploader;
}).call(this);

module.exports = this.FileUploader;