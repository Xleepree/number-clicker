NC.Storage.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.appModel.appModelCoreChanged, () => {
        NC.Storage.saveAppModel();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.autosaveToggled, () => {
        NC.Storage.Autosave.check();
    });
}

NC.Storage.checkSlotValidity = function(slot) {
    if (slot == 1 || slot == 2 || slot == 3) {
        return true;
    } else {
        return false;
    }
}

NC.Storage.checkStoredSlotValidity = function(slot) {
    const prefix = NC.Storage.createPrefix(slot);
    const savedCore = localStorage.getItem(`${prefix}core`);
    const savedStore = localStorage.getItem(`${prefix}store`);
    const savedAchs = localStorage.getItem(`${prefix}achievements`);
    if (!savedCore || !savedStore || !savedAchs) {
        return false;
    } else {
        return true;
    }
}

NC.Storage.createPrefix = function(slot) {
    return `slot${slot}-`;
}

NC.Storage.loadDefaults = function() {
    NC.Handlers.assignDefaultsGameModel("core");
    NC.Handlers.assignDefaultsGameModel("store");
    NC.Handlers.assignDefaultsGameModel("achievements");
    return NC.Logs.internalMessage("Loaded defaults for game state");
}

NC.Storage.save = function(slot) {
    if (!NC.Storage.checkSlotValidity(slot)) {
        return NC.Logs.internalError(`Slot "${slot}" is not a valid slot to save`);
    } else {
        const prefix = NC.Storage.createPrefix(slot);
        localStorage.setItem(`${prefix}core`, JSON.stringify(NC.GameModel.core));
        localStorage.setItem(`${prefix}store`, JSON.stringify(NC.GameModel.store));
        localStorage.setItem(`${prefix}achievements`, JSON.stringify(NC.GameModel.achievements));
        return NC.Events.Signals.emit(NC.Events.events.storage.savedTo, {
            slot: slot
        });
    }
}

NC.Storage.load = function(slot, init = false) {
    if (!NC.Storage.checkSlotValidity(slot)) {
        return NC.Logs.internalError(`Slot "${slot}" is not a valid slot to load`);
    } else if (slot == NC.AppModel.core.saveSlot && init != true) {
        return NC.Logs.internalError(`Slot "${slot}" to load is already loaded`);
    } else if (!NC.Storage.checkStoredSlotValidity(slot)) {
        NC.Events.Signals.emit(NC.Events.events.storage.invalidSave, {
            slot: slot
        });
    } else {
        const prefix = NC.Storage.createPrefix(slot);
        const savedCore = localStorage.getItem(`${prefix}core`);
        const savedStore = localStorage.getItem(`${prefix}store`);
        const savedAchs = localStorage.getItem(`${prefix}achievements`);
        NC.Handlers.assignSavedGameModel("core", JSON.parse(savedCore));
        NC.Handlers.assignSavedGameModel("store", JSON.parse(savedStore));
        NC.Handlers.assignSavedGameModel("achievements", JSON.parse(savedAchs));
        return NC.Events.Signals.emit(NC.Events.events.storage.saveLoaded, {
            slot: slot
        });
    }
}

NC.Storage.removeSlotData = function(slot) {
    const prefix = NC.Storage.createPrefix(slot);
    localStorage.removeItem(`${prefix}core`);
    localStorage.removeItem(`${prefix}store`);
    localStorage.removeItem(`${prefix}achievements`);
}

NC.Storage.reset = function(slot) {
    if (!NC.Storage.checkSlotValidity(slot) && slot !== "all") {
        return NC.Logs.internalError(`Slot "${slot}" is not a valid slot to reset`);
    } else {
        if (slot == "all") {
            for (let slot = 0; slot <= 3; slot++) {
                NC.Storage.removeSlotData(slot);
            }
        } else {
            NC.Storage.removeSlotData(slot);
        }
        return NC.Events.Signals.emit(NC.Events.events.storage.saveReset, {
            slot: slot
        });
    }
}

NC.Storage.prepareSlot = function(slot) {
    if (!NC.Storage.checkSlotValidity(slot)) {
        return NC.Logs.internalError(`Slot "${slot}" is not a valid slot to prepare`);
    } else if (slot == NC.AppModel.core.saveSlot) {
        return NC.Logs.internalError(`Slot ${slot} to prepare is already loaded`);
    } else {
        const prefix = NC.Storage.createPrefix(slot);
        localStorage.setItem(`${prefix}core`, JSON.stringify(NC.GameModel.constants.coreDefault));
        localStorage.setItem(`${prefix}store`, JSON.stringify(NC.GameModel.constants.storeDefault));
        localStorage.setItem(`${prefix}achievements`, JSON.stringify(NC.GameModel.constants.achievementsDefault));
        return NC.Logs.internalMessage(`Prepared save slot ${slot}`);
    }
}

NC.Storage.prepareAndLoad = function(slot) {
    NC.Storage.prepareSlot(slot);
    NC.Storage.load(slot);
    return NC.Logs.internalMessage(`Prepared and loaded slot ${slot}`);
}

NC.Storage.saveAppModel = function() {
    const prefix = `appmodel_`;
    localStorage.setItem(`${prefix}core`, JSON.stringify(NC.AppModel.core));
    return NC.Logs.internalMessage("Saved AppModel to localStorage");
}

NC.Storage.loadAppModel = function() {
    const prefix = `appmodel_`;
    savedAppModelCore = localStorage.getItem(`${prefix}core`);
    if (!savedAppModelCore) { return; }
    NC.Handlers.assignSavedAppModel("core", JSON.parse(savedAppModelCore));
    return NC.Logs.internalMessage("Loaded AppModel from localStorage");
}

NC.Storage.initializeSave = function() {
    if (NC.AppModel.core.saveSlot != null) { 
        return NC.Storage.load(NC.AppModel.core.saveSlot, true); 
    } else {
        return NC.Logs.internalMessage("No loaded save slot was found, continuing without a loaded slot");
    }
}

NC.Storage.Autosave = {
    on() {
        NC.Intervals.startInterval(
            "autosave",
            NC.Storage.Autosave.refresh,
            60000
        );
    },
    off() {
        if(NC.Intervals.intervalExists("autosave")) {
            NC.Intervals.stopInterval("autosave");
        }
    },
    refresh() {
        if (NC.AppModel.core.saveSlot === null) { return; }
        NC.Storage.save(NC.AppModel.core.saveSlot);
    },
    check() {
        switch (NC.AppModel.core.autosaveEnabled) {
            case true: { 
                NC.Storage.Autosave.on();
                return NC.Logs.internalMessage("Autosave is enabled, continuing with autosave"); 
                break; 
            }
            case false: { 
                NC.Storage.Autosave.off();
                return NC.Logs.internalMessage("Autosave is disabled, continuing without autosave"); 
                break; 
            }
            default: {
                return NC.Logs.internalError("NC.AppModel.core.autosaveEnabled is invalid");
                break;
            }
        }
    }
}