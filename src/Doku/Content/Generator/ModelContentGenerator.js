;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var Util                = use('Util');

    /**
     * @constructor
     */
    function ModelContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    ModelContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'model.txt.swig';
    };

    Util.inherits(ModelContentGenerator, ContentGenerator);

    this.ModelContentGenerator = ModelContentGenerator;
}).call(this);

module.exports = this.ModelContentGenerator;