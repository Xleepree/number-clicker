NC.Handlers.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.storage.invalidSave, async ({ slot }) => {
        NC.Handlers.invalidSave(slot);
    });
    NC.Events.Signals.on(NC.Events.events.storage.saveLoaded, async ({ slot }) => {
        NC.Handlers.saveLoaded(slot);
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.pointsBoxClicked, async () => {
        NC.Handlers.pointsBoxClicked();
    });
    NC.Events.Signals.on(NC.Events.events.storage.saveReset, async({ slot }) => {
        NC.Handlers.saveReset(slot);
    });
    NC.Events.Signals.on(NC.Events.events.storage.savedTo, async({ slot }) => {
        NC.Handlers.savedTo(slot);
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.achievementUnlocked, async({ ach }) => {
        NC.Handlers.achievementUnlocked(ach);
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.insufficientPoints, async({ itemInfo }) => {
        NC.Handlers.insufficientPoints(itemInfo);
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.autoclicked, async () => {
        NC.Handlers.autoclicked();
    });
}

NC.Handlers.invalidSave = async function(slot) {
    NC.Audio.playSfx("badalert");
    const loadAnyway = await NC.Render.screenBoxConfirm(`
        Slot ${slot}'s data is absent or damaged. Would
        you like to load defaults for it?
    `);
    if (!loadAnyway) {
        return;
    } else {
        NC.Storage.prepareAndLoad(slot);
    }
}

NC.Handlers.saveLoaded = function(slot) {
    NC.Audio.playSfx("compac");
    NC.Render.screenBoxNotification(`Loaded save slot ${slot}.`);
    NC.AppModel.core.saveSlot = slot;
}

NC.Handlers.saveReset = function(slot) {
    NC.Audio.playSfx("trash");
    if (slot === "all") {
        NC.Render.screenBoxNotification(`Reset all save slots.`);
        NC.AppModel.core.saveSlot = null;
    } else {
        NC.Render.screenBoxNotification(`Reset save slot ${slot}.`);
    }
    if (slot === "all" || slot == NC.AppModel.core.saveSlot) {
        NC.Handlers.assignDefaultsGameModel("core");
        NC.Handlers.assignDefaultsGameModel("store");
        NC.Handlers.assignDefaultsGameModel("achievements");
    }
}

NC.Handlers.savedTo = function(slot) {
    NC.Audio.playSfx("svribble");
    NC.Render.screenBoxNotification(`Saved game to slot ${slot}.`);
}

NC.Handlers.pointsBoxClicked = function() {
    NC.Handlers.trackCps();
    NC.Audio.playSfx("click");
}

NC.Handlers.trackCps = function() { NC.GameModel.runtime.clickCount++;}

NC.Handlers.updateCps = function() {
    NC.GameModel.runtime.cps = NC.GameModel.runtime.clickCount;
    NC.GameModel.runtime.clickCount = 0;
    NC.Events.Signals.emit(NC.Events.events.gameModel.cpsUpdated);
}

NC.Handlers.gameMenu = function(category, init = false) {
    if (init != true) { NC.Audio.playSfx("boston"); }
    NC.AppModel.runtime.gameMenuCategoryLoaded = category;
    NC.Events.Signals.emit(NC.Events.events.appModel.gameMenuCategoryChanged);
}

NC.Handlers.storeMenu = function(category, init = false) {
    if (init != true) { NC.Audio.playSfx("boston"); }
    NC.AppModel.runtime.storeMenuCategoryLoaded = category;
    NC.Events.Signals.emit(NC.Events.events.appModel.storeMenuCategoryChanged);
}

NC.Handlers.assignSavedGameModel = function(part, savedPart) {
    switch (part) {
        case "core":
            NC.GameModel.core = Object.assign(NC.GameModel.core, savedPart);
            break;
        case "store":
            NC.GameModel.store = Object.assign(NC.GameModel.store, savedPart);
            break;
        case "achievements":
            NC.GameModel.achievements = Object.assign(NC.GameModel.achievements, savedPart);
            break;
        default:
            return NC.Logs.internalError(
                `Part "${part}" of GameModel to assign saved counterpart to does not exist`
            );
    }
    return NC.Events.Signals.emit(NC.Events.events.gameModel.gameModelReassigned);                                                  
}

NC.Handlers.assignDefaultsGameModel = function(part) {
    switch (part) {
        case "core":
            NC.GameModel.core = Object.assign(NC.GameModel.core, NC.GameModel.constants.coreDefault);
            break;
        case "store":
            NC.GameModel.store = Object.assign(NC.GameModel.store, NC.GameModel.constants.storeDefault);
            break;
        case "achievements":
            NC.GameModel.achievements = Object.assign(NC.GameModel.achievements, NC.GameModel.achievementsDefault);
            break;
        default:
            return NC.Logs.internalError(
                `Part "${part}" of GameModel to assign saved defaults to does not exist`
            );
    }
    return NC.Events.Signals.emit(NC.Events.events.gameModel.gameModelReassigned);
}

NC.Handlers.loadAppModelDefaults = function() {
    Object.assign(NC.AppModel.core, NC.AppModel.coreDefault);
    return NC.Logs.internalMessage("Loaded defaults for AppModel");
}

NC.Handlers.assignSavedAppModel = function(part, savedPart) {
    switch (part) {
        case "core":
            Object.assign(NC.AppModel.core, savedPart);
            break;
        default:
            return NC.Logs.internalError(
                `Part "${part}" of AppModel to assign saved counterpart to does not exist`
            );
    }
}

NC.Handlers.changeTheme = function(theme) {
    switch (theme) {
        case "light": {
            NC.AppModel.core.gameTheme = "light-theme";
            break;
        }
        case "dark": {
            NC.AppModel.core.gameTheme = "dark-theme";
            break;
        }
        default: {
            return NC.Logs.internalError(`Theme "${theme}" is not a valid theme to load`);
        }
    }
    NC.Audio.playSfx("menuSwitchy");
    return NC.Events.Signals.emit(NC.Events.events.appModel.gameThemeChanged);
}

NC.Handlers.toggleFullscreen = function() {
    switch (NC.AppModel.runtime.fullscreen) {
        case true: {
            NC.AppModel.runtime.fullscreen = false;
            break;
        }
        case false: {
            NC.AppModel.runtime.fullscreen = true;
            break;
        }
        default: {
            return NC.Logs.internalError("NC.AppModel.runtime.fullscreen is invalid");
            break;
        }
    }
    return NC.Events.Signals.emit(NC.Events.events.appModel.fullscreenChanged);
}

NC.Handlers.changeSfxVolume = function(volume) {
    if (volume < 0 || volume > 100) { return NC.Logs.internalError(`SFX volume "${volume}" is invalid`); }
    NC.AppModel.core.sfxVolume = volume;
    NC.Events.Signals.emit(NC.Events.events.appModel.sfxVolumeChanged);
}

NC.Handlers.toggleAutosave = function() {
    if (NC.AppModel.core.saveSlot === null) {
        NC.Audio.playSfx("badalert");
        NC.Render.screenBoxNotification("You have no save slot loaded.");
        return NC.Events.Signals.emit(NC.Events.events.renderRegistry.autosaveButtonRejected);
    }
    switch (NC.AppModel.core.autosaveEnabled) {
        case true: {
            NC.AppModel.core.autosaveEnabled = false;
            break;
        }
        case false: {
            NC.AppModel.core.autosaveEnabled = true;
            break;
        }
        default: {
            return NC.Logs.internalError("NC.AppModel.core.saveSlot is invalid");
            break;
        }
    }
    return NC.Events.Signals.emit(NC.Events.events.appModel.autosaveToggled);
}

NC.Handlers.resetSlot = async function(slot) {
    if (slot != 1 && slot != 2 && slot != 3 && slot != "all") {
        return NC.Logs.internalError(`Slot "${slot}" to reset is invalid`);
    } else {
        NC.Audio.playSfx("confirmyLialog");
        let go = await NC.Render.screenBoxConfirm(
            `Are you sure you would like to reset 
            ${slot === "all" ? "all slots" : `slot ${slot}`}?`
        );
        if (!go) { return; }
        NC.Storage.reset(slot);
    }
}

NC.Handlers.loadSlot = async function(slot) {
    if (slot != 1 && slot != 2 && slot != 3) {
        return NC.Logs.internalError(`Slot "${slot}" to load is invalid`);
    } else if (slot == NC.AppModel.core.saveSlot) {
        NC.Audio.playSfx("badalert");
        NC.Render.screenBoxNotification(`You already have slot ${slot} loaded.`);
        return NC.Events.Signals.emit(NC.Events.events.renderRegistry.saveSlotsConfigButtonRejected, {
            slot: slot,
            action: "load"
        });
    } else {
        NC.Audio.playSfx("confirmyLialog");
        let go = await NC.Render.screenBoxConfirm(
            `Are you sure you would like to load slot ${slot}?`
        );
        if (!go) { return; }
        NC.Storage.load(slot);
    }
}

NC.Handlers.saveSlot = async function(slot) {
    if (slot != 1 && slot != 2 && slot != 3) {
        return NC.Logs.internalError(`Slot "${slot}" to save is invalid`);
    } else {
        NC.Audio.playSfx("confirmyLialog");
        let go = await NC.Render.screenBoxConfirm(
            `Are you sure you would like to save slot ${slot}?`
        );
        if (!go) { return; }
        NC.Storage.save(slot);
    }
}

NC.Handlers.achievementUnlocked = function(ach) {
    NC.Audio.playSfx("ach");
    NC.Render.screenBoxAchievement(ach);
}

NC.Handlers.insufficientPoints = function(itemInfo) {
    const itemKey = itemInfo[0];
    const itemCategory = itemInfo[1];
    const item = NC.GameModel.store[itemCategory][itemKey];
    const pointsNeeded = item.price - NC.GameModel.core.points;
    NC.Audio.playSfx("badalert");
    NC.Render.screenBoxNotification(`You need ${pointsNeeded} more points to purchase "${item.name}."`);
    return NC.Events.Signals.emit(NC.Events.events.renderRegistry.storeItemRejected, {
        item: itemKey
    });
}

NC.Handlers.autoclicked = function() {
    NC.Audio.playSfx("clang");
}

NC.Handlers.Init = {
    Cps() {
        NC.Intervals.startInterval({
            name: "updateCps",
            fn: NC.Handlers.updateCps,
            delay: 1000
        });
        return NC.Logs.internalMessage("Initialized measuring for clicks per second (CPS)");
    },
    firstUserInteraction() {
        document.addEventListener("click", () => {
            NC.Events.Signals.emit(NC.Events.events.generic.firstUserInteraction);
        });
        return NC.Logs.internalMessage("Initialized listener for first user interaction (first click)");
    },
    menus() {
        NC.Handlers.gameMenu("stats", true);
        NC.Handlers.storeMenu("general", true);
        return NC.Logs.internalMessage("Initalized game menu and store menu");
    },
    autoclick() {
        NC.Intervals.startInterval({
            name: "autoclick",
            fn: NC.Points.autoclick,
            delay: 1000
        });
    },
    splashScreen() {
        NC.Render.splashScreen();
        return NC.Logs.internalMessage("Appending splash screen...");
    }
};

