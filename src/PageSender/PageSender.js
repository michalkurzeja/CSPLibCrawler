(function() {
    'use strict';

    var request = require('request');

    function PageSender() {}

    PageSender.prototype.post = function(url, formData) {
        return request.postAsync(url, { form: formData });
    };

    this.PageSender = PageSender;
}).call(this);

module.exports = this.PageSender;
