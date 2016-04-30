;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var Util                = use('Util');

    /**
     * @constructor
     */
    function AuthorContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    AuthorContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'author.txt.swig';
    };

    Util.inherits(AuthorContentGenerator, ContentGenerator);

    this.AuthorContentGenerator = AuthorContentGenerator;
}).call(this);

module.exports = this.AuthorContentGenerator;