;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var Util                = use('Util');

    /**
     * @constructor
     */
    function ResultContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    ResultContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'result.txt.swig';
    };

    Util.inherits(ResultContentGenerator, ContentGenerator);

    this.ResultContentGenerator = ResultContentGenerator;
}).call(this);

module.exports = this.ResultContentGenerator;