;(function() {
    "use strict";

    var ContentGenerator    = use('Doku.ContentGenerator.Abstraction.ContentGenerator');
    var util                = use('util');


    function CategoryContentGenerator() {
        ContentGenerator.call(this);
    }

    CategoryContentGenerator.prototype.getDefaultTemplateName = function() {
        return 'category_list.txt';
    };

    util.inherits(CategoryContentGenerator, ContentGenerator);

    this.CategoryContentGenerator = CategoryContentGenerator;
}).call(this);

module.exports = this.CategoryContentGenerator;