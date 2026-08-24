NC.Logs.runtime = {
    verbosity: 2
}

NC.Logs.internalError = function(message, specialType = null) {
    switch (NC.Logs.runtime.verbosity) {
        case 0: {
            return;
            break;
        }
        case 1: {
            break;
        }
        case 2: {
            break;
        }
    }
    if (specialType != null && NC.Logs.runtime.verbosity >= 1) {
        switch (specialType) {
            case "TypeError": {
                throw new TypeError(message);
                break;
            }
            case "RangeError": {
                throw new RangeError(message);
                break;
            }
            default: {
                return NC.Logs.internalError(`Special error type "${specialType}" is invalid`);
            }
        }
    }
    throw new Error(`An error occurred: "${message}"`);
    NC.Events.Signals.emit(NC.Events.events.generic.internalError);
}

NC.Logs.internalWarning = function(message) {
    switch (NC.Logs.runtime.verbosity) {
        case 0:
            return;
            break;
        case 1:
            break;
        case 2:
            break;
    }
    console.warn(`Warning: "${message}"`);
    NC.Events.Signals.emit(NC.Events.events.generic.internalWarning);
}

NC.Logs.internalMessage = function(message) {
    switch (NC.Logs.runtime.verbosity) {
        case 0:
            return;
            break;
        case 1:
            return;
            break;
        case 2:
            break;
    }
    console.log(message);
    NC.Events.Signals.emit(NC.Events.events.generic.internalMessage);
}