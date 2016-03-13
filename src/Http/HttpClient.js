;(function() {
    'use strict';

    var Request = use('Request');
    var Promise = use('Bluebird');
    var Merge   = use('Merge');

    function HttpClient() {}

    HttpClient.prototype.get = function(url, cookieJar, encoding) {
        cookieJar = cookieJar || Request.jar();
        encoding = encoding || null;

        return new Promise(function(resolve, reject) {
            Request.get(
                {
                    url: url,
                    jar: cookieJar,
                    encoding: encoding
                },
                function (error, response) {
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

    HttpClient.prototype.post = function(data, cookieJar) {
        cookieJar = cookieJar || Request.jar();

        return new Promise(function(resolve, reject) {
            Request.post(
                Merge(
                    { jar: cookieJar },
                    data
                ),
                function (error, response, body) {
                    response.jar = function() {
                        return cookieJar;
                    };

                    if (!error) {
                        resolve(response);
                    }

                    reject('Received error on [POST] ' + data.url);
                }
            );
        });
    };

    this.HttpClient = HttpClient;
}).call(this);

module.exports = this.HttpClient;