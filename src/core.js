window.NC = {}; // global number clicker domain

NC.initializeDomain = function(domainName) {
    if (!NC[domainName]) NC[domainName] = {};
    if (!NC[domainName].constants) NC[domainName].constants = {};
}

// roster
NC.initializeDomain("Bootstrap");
NC.initializeDomain("Data");
NC.initializeDomain("Player");
NC.initializeDomain("Points");
NC.initializeDomain("Multimedia");
NC.initializeDomain("Ui");
NC.initializeDomain("Upgrades");
NC.initializeDomain("Ach");

/* types, put at the end of each domain
    constants --vv
    NC.constantsFunction("Example");
*/
NC.constantsFunction = function(domainName) {
    const domain = window.NC[domainName];
    if (!domain || typeof domain !== "object" || !domain.constants) {
        console.error(`NC.constantsFunction: domain "${domainName}" is invalid`);
    } else {
        for (const key in domain.constants) {
            const value = domain.constants[key];
            if (value && typeof value === "object") {
                Object.freeze(value);
            }
        }
    }
}
