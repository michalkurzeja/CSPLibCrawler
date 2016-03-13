;(function() {
    "use strict";

    var swig = use('swig');

    const TEMPLATES_DIR = global.app.rootDir + '/../src/Templates';

    function ContentGenerator() {}

    ContentGenerator.prototype.generate = function(options) {
        return this.generateTemplate(
            this.findTemplate(this.getDefaultTemplateName()),
            options
        );
    };

    ContentGenerator.prototype.generateTemplate = function(template, options) {
        return swig.renderFile(template, options);
    };

    ContentGenerator.prototype.findTemplate = function(templateName) {
        return TEMPLATES_DIR + '/' + templateName;
    };

    ContentGenerator.prototype.getDefaultTemplateName = function() {
        throw 'This function must be overriden!';
    };

    this.ContentGenerator = ContentGenerator;
}).call(this);

module.exports = this.ContentGenerator;
