;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.ContentGenerator.Abstraction.ContentGenerator');
    var util                = use('util');


    function ProblemContentGenerator() {
        ContentGenerator.call(this);
    }

    ProblemContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'problem.txt';
    };

    util.inherits(ProblemContentGenerator, ContentGenerator);

    this.ProblemContentGenerator = ProblemContentGenerator;
}).call(this);

module.exports = this.ProblemContentGenerator;