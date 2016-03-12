;(function() {
    "use strict";

    use('util');

    const ROUTES_PATH = global.app.rootDir + '/../config/routes.json';

    function Router(jsonLoader) {
        Object.defineProperty(this, 'routes', {value: jsonLoader.load(ROUTES_PATH)});
    }

    Router.prototype.path = function(routeName, params) {
        guardAgainstUndefinedRoute.call(this, routeName);

        if (typeof params === 'undefined') {
            params = {};
        }

        var path = getPath.call(this, routeName).slice(0);

        for (var key in params) {
            path = path.replace('{' + key + '}', params[key]);
        }

        return path;
    };

    Router.prototype.url = function(host, routeName, params) {
        return host + this.path(routeName, params);
    };

    function guardAgainstUndefinedRoute(routeName) {
        if (!getPath.call(this, routeName)) {
            throw util.format('Route "%s" is not defined.', routeName);
        }
    }

    function getPath(routeName) {
        return this.routes[routeName];
    }

    this.Router = Router;
}).call(this);

module.exports = this.Router;
