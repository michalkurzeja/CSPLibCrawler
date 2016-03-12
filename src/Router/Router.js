;(function() {
    "use strict";

    use('Fs');
    use('util');

    const ROUTES_PATH = global.app.rootDir + '/../config/routes.json';

    function Router() {
        Object.defineProperty(this, 'routes', {value: JSON.parse(Fs.readFileSync(ROUTES_PATH, 'utf8'))});
    }

    Router.prototype.path = function(routeName, params) {
        guardAgainstUndefinedRoute(routeName);

        var path = getPath(routeName).slice(0);

        params.forEach(function(value, key) {
            path.replace('{' + key + '}', value);
        });

        return path;
    };

    Router.prototype.url = function(host, routeName, params) {
        return host + this.path(routeName, params);
    };

    function guardAgainstUndefinedRoute(routeName) {
        if (!getPath(routeName)) {
            throw util.format('Route "%s" is not defined.', routeName);
        }
    }

    function getPath(routeName) {
        return this.routes[routeName];
    }

    this.Router = Router;
}).call(this);

module.exports = this.Router;
