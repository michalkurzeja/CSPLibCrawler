;(function() {
    'use strict';

    var Cheerio = use('Cheerio');
    var Promise = use('Bluebird');

    /**
     * @constructor
     * @param {Router} router
     * @param {DokuHttpClient} dokuHttpClient
     */
    function DokuHttpUploaderPage(router, dokuHttpClient) {
        Object.defineProperty(this, 'router', {
            value: router
        });

        Object.defineProperty(this, 'dokuHttpClient', {
            value: dokuHttpClient
        });
    }

    /**
     * @public
     * @param {string} id
     * @param {string} data
     * @returns {Promise}
     */
    DokuHttpUploaderPage.prototype.editPage = function(id, data) {
        var client = this.dokuHttpClient;
        var url = this.router.url(getParameter('dokuwiki.host'), 'dokuwiki.page', { pageId: id });
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
                    return client.post(
                        url,
                        {
                            form: {
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
                            }
                        },
                        result.response.jar()
                    );
                }
            )
            .then(
                function(response) {
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
     * @returns {object}
     */
    function extractData($) {
        var $form = $('#dw__editform');

        return {
            sectok: $form.find('input[name=sectok]').val(),
            changecheck: $form.find('input[name=changecheck]').val()
        };
    }

    this.DokuHttpUploaderPage = DokuHttpUploaderPage;
}).call(this);

module.exports = this.DokuHttpUploaderPage;