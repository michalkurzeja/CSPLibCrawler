;(function() {
    'use strict';

    function DescriptionExtractor() {

        DescriptionExtractor.prototype.extract = function($, $contentRoot) {
            return $contentRoot.contents().not('.bib').not('table').not('.page-header').map(function(i, paragraph) {
                return $(paragraph).wrap('<div></div>').parent().html();
            }).toArray();
        }
    }

    this.DescriptionExtractor = DescriptionExtractor;
}).call(this);

module.exports = this.DescriptionExtractor;