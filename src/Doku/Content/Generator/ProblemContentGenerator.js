;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var util                = use('util');

    /**
     * @constructor
     */
    function ProblemContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    ProblemContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'problem.txt.swig';
    };

    util.inherits(ProblemContentGenerator, ContentGenerator);

    this.ProblemContentGenerator = ProblemContentGenerator;
}).call(this);

module.exports = this.ProblemContentGenerator;