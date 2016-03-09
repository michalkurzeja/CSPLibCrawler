(function() {
    'use strict';

    var request = require('request');

    function HttpClient() {}

    HttpClient.prototype.get = function(url) {
        return request.getAsync(url);
    };

    HttpClient.prototype.post = function(url, formData) {
        return request.postAsync(url, { form: formData });
    };

    this.HttpClient = HttpClient;
}).call(this);

module.exports = this.HttpClient;
