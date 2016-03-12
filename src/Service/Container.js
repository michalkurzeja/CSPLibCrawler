;(function() {
    "use strict";

    use('Fs');
    use('util');

    const SERVICES_PATH = global.app.rootDir + '/../config/services.json';

    function Container() {
        Object.defineProperty(this, 'serviceDefinitions', {value: JSON.parse(Fs.readFileSync(SERVICES_PATH, 'utf8'))});
        Object.defineProperty(this, 'services', {value: {}});

        global.getService = (function(scope) {
            return function(serviceName) {
                return scope.get(serviceName);
            };
        })(this);
    }

    Container.prototype.get = function(serviceName) {
        guardAgainstUndefinedService.call(this, serviceName);

        var definition = getServiceDefinition.call(this, serviceName);

        if (definition.shared) {
            var service = getCachedService.call(this, definition.class);

            if (!service) {
                service = createService.call(this, definition);
                cacheService.call(this, definition.class, service);
            }

            return service;
        }

        return createService.call(this, definition);
    };

    function guardAgainstUndefinedService(serviceName) {
        if (!getServiceDefinition.call(this, serviceName)) {
            throw util.format('Service "%s" is not defined.', serviceName);
        }
    }

    function getServiceDefinition(serviceName) {
        return this.serviceDefinitions[serviceName];
    }

    function getCachedService(serviceClass) {
        return this.services[serviceClass]
            ? this.services[serviceClass]
            : null;
    }

    function cacheService(serviceClass, service) {
        this.services[serviceClass] = service;
    }

    function createService(definition) {
        var ServiceClass = definition.module
            ? use(definition.class)
            : definition.class;

        function Service(args) {
            return ServiceClass.apply(this, args);
        }

        Service.prototype = ServiceClass.prototype;

        return new Service(definition.arguments);
    }

    this.Container = Container;
}).call(this);

module.exports = this.Container;
