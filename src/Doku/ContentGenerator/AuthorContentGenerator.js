;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.ContentGenerator.Abstraction.ContentGenerator');
    var util                = use('util');


    function AuthorContentGenerator() {
        ContentGenerator.call(this);
    }

    AuthorContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'author.txt.swig';
    };

    util.inherits(AuthorContentGenerator, ContentGenerator);

    this.AuthorContentGenerator = AuthorContentGenerator;
}).call(this);

module.exports = this.AuthorContentGenerator;