window.NC = {};
NC.version = "0.1.0-beta";

NC.initializeDomain = function(domainName) {
    if (NC[domainName]) {
        return console.error(`Domain "${domainName}" already exists`);
    } else {
        NC[domainName] = {
            constants: {},
            runtime: {}
        }
    }
    return console.log(`Initialized domain "${domainName}"`);
}

// infrastructure
NC.initializeDomain("Events");
NC.initializeDomain("Logs"); 
NC.initializeDomain("Intervals");
NC.initializeDomain("HTML");

// models
NC.initializeDomain("AppModel"); // for Application orchestration
NC.initializeDomain("GameModel"); // for any Gameplay

// application orchestration
NC.initializeDomain("Handlers");

// application services
NC.initializeDomain("RenderRegistry"); // used only by Render
NC.initializeDomain("Render");
NC.initializeDomain("Storage");
NC.initializeDomain("Audio");

// gameplay
NC.initializeDomain("Points");
NC.initializeDomain("Store"); // subprograms
NC.initializeDomain("Achs");

// initialization
NC.initializeDomain("Bootstrap");

NC.recursiveObjectFreeze = function(object, seen = new WeakSet()) {
    if (object === null || typeof object !== "object" || seen.has(object)) {
        return object;
    }
    seen.add(object);
    for (const value of Object.values(object)) {
        NC.recursiveObjectFreeze(value, seen);
    }
    return Object.freeze(object);
}
NC.freezeDomainConstants = function(domainName) {
    const domain = window.NC[domainName];
    if (!domain || typeof domain !== "object" || !domain.constants) {
        return console.error(`
            Domain "${domainName}" to freeze is invalid, nonexistent, or does not have a constants object
        `);
    } else {
        NC.recursiveObjectFreeze(domain.constants);
        return console.log(`Froze constants of domain "${domainName}"`);
    }
}
NC.freezeAllDomainConstants = function() {
    for (const [name, value] of Object.entries(NC)) {
        if (value && typeof value === "object" && value.constants) {
            NC.freezeDomainConstants(name);
        }
    }
}