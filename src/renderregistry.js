NC.RenderRegistry.elements = {
    page: {
        gameMenu: {
            id: "page_gameMenu"
        },
        gameMenuContent: {
            id: "page_gameMenuContent"
        },
        middleCountertop: {
            id: "page_middleCountertop"
        },
        pointsBoxGradient: {
            id: "page_pointsBoxGradient"
        },
        storeMenu: {
            id: "page_storeMenu"
        },
        storeMenuContent: {
            id: "page_storeMenuContent"
        },
        saveSlotsConfig: {
            id: "page_saveSlotsConfig"
        },
        saveSlotsConfigAll: {
            id: "page_saveSlotsConfigAll"
        },
        saveSlotsConfig1: {
            id: "page_saveSlotsConfig1"
        },
        saveSlotsConfig2: {
            id: "page_saveSlotsConfig2"
        },
        saveSlotsConfig3: {
            id: "page_saveSlotsConfig3"
        },
        screenboxConfirmScreen: {
            id: "page_screenboxConfirmScreen"
        },
        cursorCrackEffect: {
            id: "page_cursorCrackEffect"
        }
    },
    textfield: {
        countertopLineVersion: {
            id: "textfield_countertopLineVersion"
        },
        countertopLineSlot: {
            id: "textfield_countertopLineSlot"
        },
        points: {
            id: "textfield_points"
        },
        cps: {
            id: "textfield_cps"
        },
        clickPower: {
            id: "textfield_clickPower"
        },
        statPoints: {
            id: "textfield_statPoints"
        },
        statClickPower: {
            id: "textfield_statClickPower"
        },
        autoclickerPower: {
            id: "textfield_autoclickerPower"
        },
        gamblesWon: {
            id: "textfield_gamblesWon"
        },
        gamblingPointsWon: {
            id: "textfield_gamblingPointsWon"
        },
        pointsSpent: {
            id: "textfield_pointsSpent"
        },
        gamblesLost: {
            id: "textfield_gamblesLost"
        },
        gamblingPointsLost: {
            id: "textfield_gamblingPointsLost"
        },
        sfxVolume: {
            id: "textfield_sfxVolume"
        }
    },
    button: {
        gameMenuNavigationStats: {
            id: "button_gameMenuNavigationStats"
        },
        gameMenuNavigationAchs: {
            id: "button_gameMenuNavigationAchs"
        },
        gameMenuNavigationOptions: {
            id: "button_gameMenuNavigationOptions"
        },
        pointsBox: {
            id: "button_pointsBox"
        },
        storeMenuNavigationGeneral: {
            id: "button_storeMenuNavigationGeneral"
        },
        storeMenuNavigationAutoclickers: {
            id: "button_storeMenuNavigationAutoclickers"
        },
        lightMode: {
            id: "button_lightMode"
        },
        darkMode: {
            id: "button_darkMode"
        },
        fullscreen: {
            id: "button_fullscreen"
        },
        sfxVolume: {
            id: "button_sfxVolume"
        },
        autosave: {
            id: "button_autosave"
        },
        saveSlotsConfigAllReset: {
            id: "button_saveSlotsConfigAllReset"
        },
        saveSlotsConfig1Save: {
            id: "button_saveSlotsConfig1Save"
        },
        saveSlotsConfig1Load: {
            id: "button_saveSlotsConfig1Load"
        },
        saveSlotsConfig1Reset: {
            id: "button_saveSlotsConfig1Reset"
        },
        saveSlotsConfig2Save: {
            id: "button_saveSlotsConfig2Save"
        },
        saveSlotsConfig2Load: {
            id: "button_saveSlotsConfig2Load"
        },
        saveSlotsConfig2Reset: {
            id: "button_saveSlotsConfig2Reset"
        },
        saveSlotsConfig3Save: {
            id: "button_saveSlotsConfig3Save"
        },
        saveSlotsConfig3Load: {
            id: "button_saveSlotsConfig3Load"
        },
        saveSlotsConfig3Reset: {
            id: "button_saveSlotsConfig3Reset"
        }
    }
};

(() => {
    for (const key of [
            ...Object.keys(NC.GameModel.store.general),
            ...Object.keys(NC.GameModel.store.autoclickers)
        ]) {
        NC.RenderRegistry.elements.button[`${key}Store`] = {
            id: `button_${key}Store`
        };
        NC.RenderRegistry.elements.textfield[`${key}Price`] = {
            id: `textfield_${key}Price`
        };
    }
})();

NC.RenderRegistry.elementGroups = {
    points: [
        NC.RenderRegistry.elements.textfield.points,
        NC.RenderRegistry.elements.textfield.statPoints
    ],
    clickPower: [
        NC.RenderRegistry.elements.textfield.clickPower,
        NC.RenderRegistry.elements.textfield.statClickPower
    ],
    gamblingStats: [
        NC.RenderRegistry.elements.textfield.gamblesWon,
        NC.RenderRegistry.elements.textfield.gamblingPointsWon,
        NC.RenderRegistry.elements.textfield.gamblesLost,
        NC.RenderRegistry.elements.textfield.gamblingPointsLost
    ]
};