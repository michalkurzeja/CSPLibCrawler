;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.Content.Generator.Abstraction.ContentGenerator');
    var util                = use('util');

    /**
     * @constructor
     */
    function CategoryContentGenerator() {
        ContentGenerator.call(this);
    }

    /**
     * @protected
     * @returns {string}
     */
    CategoryContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'category_list.txt.swig';
    };

    util.inherits(CategoryContentGenerator, ContentGenerator);

    this.CategoryContentGenerator = CategoryContentGenerator;
}).call(this);

module.exports = this.CategoryContentGenerator;