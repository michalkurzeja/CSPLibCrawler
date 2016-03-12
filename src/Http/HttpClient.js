;(function() {
    'use strict';

    var Request = use('Request');
    var Promise = use('Bluebird');

    function HttpClient() {}

    HttpClient.prototype.get = function(url, cookieJar) {
        cookieJar = cookieJar || Request.jar();

        return new Promise(function(resolve, reject) {
            Request.get(
                {
                    url: url,
                    jar: cookieJar
                },
                function (error, response, body) {
                    response.jar = function() {
                        return cookieJar;
                    };

                    if (!error) {
                        resolve(response);
                    }

                    reject('Received error on [GET] ' + url);
                }
            );
        });
    };

    HttpClient.prototype.post = function(url, formData, cookieJar) {
        cookieJar = cookieJar || Request.jar();

        return new Promise(function(resolve, reject) {
            Request.post(
                {
                    url: url,
                    form: formData,
                    jar: cookieJar
                },
                function (error, response, body) {
                    response.jar = function() {
                        return cookieJar;
                    };

                    if (!error) {
                        resolve(response);
                    }

                    reject('Received error on [POST] ' + url);
                }
            );
        });
    };

    this.HttpClient = HttpClient;
}).call(this);

module.exports = this.HttpClient;