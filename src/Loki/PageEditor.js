;(function() {
    'use strict';

    var HttpClient = use('Http.HttpClient');
    var Cheerio    = use('Cheerio');

    /**
     * @constructor
     */
    function PageEditor(url) {
        Object.defineProperty(this, 'url', { value: url });
    }

    /**
     * @public
     */
    PageEditor.prototype.editPage = function(id, data, cookieJar) {
        var url = this.url;
        var promise = (new HttpClient).get(url + id + '&do=edit', cookieJar);

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
                        url + id + '&do=edit',
                        {
                            changecheck: result.data.changecheck,
                            date: Math.floor((new Date()).getTime() / 1e3),
                            do: { save: 'Save' },
                            id: id,
                            prefix: '.',
                            rev: 0,
                            sectok: result.data.sectok,
                            suffix: '',
                            summary: '',
                            target: 'section',
                            wikitext: data
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
        var $form = $('#dw__editform');

        return {
            sectok: $form.find('input[name=sectok]').val(),
            changecheck: $form.find('input[name=changecheck]').val()
        };
    }

    this.PageEditor = PageEditor;
}).call(this);

module.exports = this.PageEditor;