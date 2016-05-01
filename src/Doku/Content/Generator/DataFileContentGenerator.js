;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var Util                = use('Util');

    /**
     * @constructor
     */
    function DataFileContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    DataFileContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'data_file.txt.swig';
    };

    Util.inherits(DataFileContentGenerator, ContentGenerator);

    this.DataFileContentGenerator = DataFileContentGenerator;
}).call(this);

module.exports = this.DataFileContentGenerator;