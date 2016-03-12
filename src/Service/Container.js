;(function() {
    "use strict";

    use('Fs');
    use('util');

    const SERVICES_PATH = global.app.rootDir + '/../config/services.json';

    function Container() {
        Object.defineProperty(this, 'serviceDefinitions', {value: JSON.parse(Fs.readFileSync(SERVICES_PATH, 'utf8'))});
        Object.defineProperty(this, 'services', {value: {}});

        for (var serviceName in this.serviceDefinitions) {
            resolveDefinition(this.serviceDefinitions[serviceName]);
        }

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

        if (!isConstructable.call(this, ServiceClass)) {
            return ServiceClass;
        }

        var args = definition.arguments
            ? definition.arguments
            : [];

        function Service(args) {
            return ServiceClass.apply(this, args);
        }

        Service.prototype = ServiceClass.prototype;

        return new Service(parseArguments.call(this, args));
    }

    function resolveDefinition(definition) {
        if (typeof definition.module === 'undefined') {
            definition.module = true;
        }
        if (typeof definition.shared === 'undefined') {
            definition.shared = true;
        }
    }

    function parseArguments(args) {
        var scope = this;
        var parsedArgs = [];

        args.forEach(function(argument) {
            if (argument.startsWith('@')) {
                parsedArgs.push(scope.get(argument.substr(1)));
            } else {
                parsedArgs.push(argument);
            }

        });

        return parsedArgs;
    }

    function isConstructable(Service) {
        return typeof Service.apply !== 'undefined';
    }

    this.Container = Container;
}).call(this);

module.exports = this.Container;
