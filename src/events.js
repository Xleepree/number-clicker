NC.Events.runtime = {
    domainsSubscribedToEvents: false
}

NC.Events.Signals = {
    listeners: {},

    validatePayload(event, payload = {}) {
        const definition = event;
        const allowed = new Set(definition.payload ?? []);
        for (const key of Object.keys(payload)) {
            if (!allowed.has(key)) {
                return false;
            }
        }
        return true;
    },

    on(event, fn) {
        if (!event || !event.id) {
            return console.error(`Event "${event}" to react to does not exist`);
        } else if (!NC.Events.Signals.listeners[event.id]) {
            NC.Events.Signals.listeners[event.id] = [];
        }
        NC.Events.Signals.listeners[event.id].push(fn);
    },

    emit(event, payload = {}) {
        const listeners = NC.Events.Signals.listeners[event.id];
        if (!event) {
            return console.error(`Event "${event} to emit does not exist`);
        } else if (!listeners) { 
            return; 
        } else if (!NC.Events.Signals.validatePayload(event, payload)) {
            return console.error(`Payload "${Object.entries(payload)}" is invalid for emitting event ${event.id}`);
        } else {
            for (const fn of listeners) {
                fn(payload);
            }
        }
    }
};

NC.Events.events = {
    generic: {
        internalError: {
            id: "generic:internal_error"
        },
        internalWarning: {
            id: "generic:internal_warning"
        },
        internalMessage: {
            id: "generic:internal_message"
        },
        userMessage: {
            id: "generic:user_message"
        },
        firstUserInteraction: {
            id: "generic:first_user_interaction"
        }
    },
    storage: {
        invalidSave: {
            id: "storage:invalid_save",
            payload: ["slot"]
        },
        saveLoaded: {
            id: "storage:save_loaded",
            payload: ["slot"]
        },
        saveReset: {
            id: "storage:save_reset",
            payload: ["slot"]
        },
        savedTo: {
            id: "storage:saved_to",
            payload: ["slot"]
        }
    },
    gameModel: {
        pointsChanged: {
            id: "gamemodel:points_changed"
        },
        cpsUpdated: {
            id: "gamemodel:cps_updated"
        },
        gameModelReassigned: {
            id: "gamemodel:gamemodel_reassigned"
        },
        achievementUnlocked: {
            id: "gamemodel:achievement_unlocked",
            payload: ["ach"]
        },
        clickPowerUpdated: {
            id: "gamemodel:click_power_updated"
        },
        autoclickerPowerUpdated: {
            id: "gamemodel:autoclicker_power_updated"
        },
        pointsSpent: {
            id: "gamemodel:points_spent"
        },
        gambleWon: {
            id: "gamemodel:gamble_won",
            payload: ["pointsWon"]
        },
        gambleLost: {
            id: "gamemodel:gamble_lost",
            payload: ["pointsLost"]
        },
        insufficientPoints: {
            id: "gamemodel:insufficient_points",
            payload: ["itemInfo"]
        },
        storeItemPurchased: {
            id: "gamemodel:store_item_purchased",
            payload: ["itemInfo"]
        },
        autoclicked: {
            id: "gamemodel:autoclicked"
        },
        storeItemAvailabilityChanged: {
            id: "gamemodel:store_item_availability_changed",
            payload: ["itemInfo"]
        }
    },
    renderRegistry: {
        pointsBoxClicked: {
            id: "renderregistry:points_box_clicked"
        },
        gameMenuLoaded: {
            id: "renderregistry:game_menu_loaded",
            payload: ["category"]
        },
        storeMenuLoaded: {
            id: "renderregistry:store_menu_loaded"
        },
        autosaveButtonRejected: {
            id: "renderregistry:autosave_button_rejected"
        },
        saveSlotsConfigButtonRejected: {
            id: "renderregistry:save_slots_config_button_rejected",
            payload: ["slot", "action"]
        },
        storeItemRejected: {
            id: "renderregistry:store_item_rejected",
            payload: ["item"]
        }
    },
    appModel: {
        appModelCoreChanged: {
            id: "appmodel:app_model_changed"
        },
        gameMenuCategoryChanged: {
            id: "appmodel:game_menu_category_changed"
        },
        storeMenuCategoryChanged: {
            id: "appmodel:store_menu_category_changed"
        },
        gameThemeChanged: {
            id: "appmodel:game_theme_changed"
        },
        fullscreenChanged: {
            id: "appmodel:fullscreen_changed"
        },
        sfxVolumeChanged: {
            id: "appmodel:sfx_volume_changed"
        },
        autosaveToggled: {
            id: "appmodel:autosave_toggled"
        }
    }
}

NC.Events.chainEvents = function() {
    for (ev of [
        NC.Events.events.appModel.gameThemeChanged,
        NC.Events.events.appModel.fullscreenChanged,
        NC.Events.events.appModel.sfxVolumeChanged,
        NC.Events.events.appModel.autosaveToggled,
        NC.Events.events.storage.saveLoaded,
        NC.Events.events.storage.saveReset
    ]) { 
        NC.Events.Signals.on(ev, async () => {
            NC.Events.Signals.emit(NC.Events.events.appModel.appModelCoreChanged);
        });
    }
    NC.Logs.internalMessage("Chained together all possible events");
}

NC.Events.subscribeAllDomains = function() {
    if (NC.Events.runtime.domainsSubscribedToEvents) {
        return NC.Logs.internalError("All domains have already been subscribed to Events");
    } else {
        for (const domain of Object.values(NC)) {
            if (typeof domain.subscribeToEvents === "function") {
                domain.subscribeToEvents();
            }
        }
        NC.Events.runtime.domainsSubscribedToEvents = true;
    }
    NC.Logs.internalMessage("Subscribed all possible domains to Events");
}