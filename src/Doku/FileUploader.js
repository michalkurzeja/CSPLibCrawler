;(function() {
    'use strict';

    var HttpClient = use('Http.HttpClient');
    var Cheerio    = use('Cheerio');
    var Fs         = use('Fs');

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
        var promise = (new HttpClient).get(url, cookieJar);

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
                    return (new HttpClient).post(
                        {
                            url: url,
                            headers: {
                                'Content-Type': 'application/octet-stream'
                            },
                            body: Fs.createReadStream('/home/skie/Desktop/smallHorse4.jpg'),
                            form: {
                                call: 'mediaupload',
                                mediaid: '',
                                ns: 'problem',
                                ow: 'checked',
                                qqfile: fileName,
                                sectok: result.data.sectok
                            }
                        },
                        result.response.jar()
                    );
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