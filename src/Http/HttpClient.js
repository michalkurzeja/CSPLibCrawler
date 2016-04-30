;(function() {
    'use strict';

    var Request = use('Request');
    var Promise = use('Bluebird');
    var Extend  = use('Extend');

    function HttpClient() {}

    HttpClient.prototype.get = function(url, data, cookieJar) {
        cookieJar = cookieJar || Request.jar();
        data = data || {};

        return new Promise(function(resolve, reject) {
            Request.get(
                Extend(
                    true,
                    {
                        url: url,
                        jar: cookieJar
                    },
                    data
                ),
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

    HttpClient.prototype.post = function(url, data, cookieJar) {
        cookieJar = cookieJar || Request.jar();
        data = data || {};

        return new Promise(function(resolve, reject) {
            Request.post(
                Extend(
                    true,
                    {
                        url: url,
                        jar: cookieJar
                    },
                    data
                ),
                function (error, response, body) {
                    console.log(error);

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