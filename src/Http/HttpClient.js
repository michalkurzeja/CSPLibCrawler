(function() {
    'use strict';

    var Request = use('Request');
    var Promise = use('Bluebird');

    function HttpClient() {}

    HttpClient.prototype.get = function(url) {
        return new Promise(function(resolve, reject) {
            Request.get(
                { url: url },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(response);
                    }

                    reject('Received error on [GET] ' + url);
                }
            );
        });
    };

    HttpClient.prototype.post = function(url, formData) {
        return new Promise(function(resolve, reject) {
            Request.post(
                { url: url, form: formData },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
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