;(function() {
    "use strict";

    var Promise = use('Bluebird');

    function ProblemPublisher(fetcher, generator, pageUploader) {
        Object.defineProperty(this, 'fetcher', {value: fetcher});
        Object.defineProperty(this, 'generator', {value: generator});
        Object.defineProperty(this, 'pageUploader', {value: pageUploader});
    }

    ProblemPublisher.prototype.publish = function(cookieJar, problemId, categories) {
        return this.fetcher
            .fetch(problemId)
            .then((function(scope) {
                return function(data) {
                    data.specification.categories = categories;

                    var pageId = 'problem:' + problemId;
                    var content = scope.generator.generate({
                        id: problemId,
                        data: data
                    });

                    //console.log('Publishing problem: ' + problemId);

                    return scope.pageUploader.editPage(pageId, content, cookieJar);
                }
            })(this));
    };

    this.ProblemPublisher = ProblemPublisher;
}).call(this);

module.exports = this.ProblemPublisher;