NC.Player.constants.gameStateDefaults = {
    points: 0,
    infinity: false,
    pointsPerClick: 1,
    autoclickerPower: 0,
    steroidsPrice: 100,
    cursorCrackPrice: 50,
    gamblingPrice: 150,
    extremeGamblingPrice: 250,
    fentanylPrice: 500,
    steroidsUsed: 0,
    fentanylUsed: false,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0,
    extremeGamblingWon: false
};

NC.Player.gameState = {
    points: NC.Player.constants.gameStateDefaults.points, // 0
    infinity: false,
    pointsPerClick: 1, // click power
    autoclickerPower: 0,

    // prices for stuffys
    steroidsPrice: 100,
    cursorCrackPrice: 50,
    gamblingPrice: 150,
    extremeGamblingPrice: 250,
    fentanylPrice: 500,

    // extra stats
    steroidsUsed: 0,
    fentanylUsed: false,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0,
    extremeGamblingWon: false
};

NC.Player.gameStateAch = new Map([
    // gambling
    ["firstGamble", false],
    ["fifteenGamblesLost", false],
    ["oneHundredGamblesLost", false],
    ["fiveHundredGamblesLost", false],
    ["tenThousandPointsLostFromGambling", false],
    ["fifteenGamblesWon", false],
    ["oneHundredGamblesWon", false],
    ["fiveHundredGamblesWon", false],
    ["tenThousandPointsWonFromGambling", false],
    ["extremeGambling", false],

    // steroids
    ["tenSteroids", false],
    ["oneHundredSteroids", false],
    ["oneThousandSteroids", false],

    // points spent
    ["oneThousandPointsSpent", false],
    ["oneHundredThousandPointsSpent", false],
    ["oneMillionPointsSpent", false],

    // autoclickers
    ["helperMan", false],
    ["sunglasses", false],
    ["sweatshopWorker", false],
    ["magicalFedora", false],
    ["warjammer", false],
    ["vrooman", false],
    ["dealer", false],
    ["elmaspet", false],
    ["taxevaiden", false],
    ["masterClicker", false],
    ["timmy", false],

    // aps (autoclicks per second)
    ["oneThousandAPS", false],
    ["oneHundredThousandAPS", false],

    ["fentanyl", false],
    ["cursorCrack", false],
    ["achNaN", false],
    ["achInfinity", false]
]);

NC.Player.save = function(slot) {
    const prefix = `slot${slot}-`;
    // save game state
    Object.keys(NC.Player.gameState).forEach((key) => {
        localStorage.setItem(prefix + key, NC.Player.gameState[key]);
    });
    // save achievements
    for (let [achName, value] of NC.Player.gameStateAch.entries()) {
        localStorage.setItem(`${prefix}ach-${achName}`, value);
    }
    NC.Multimedia.playSfx("svribble");
}

NC.Player.load = function(slot) {
    if (NC.Bootstrap.gameStateLive.currentSaveSlot == slot) {
        NC.Ui.notifC(`Save slot ${slot} already loaded.`);
        NC.Multimedia.playSfx("badAlertSound");
        return;
    }
    NC.Bootstrap.gameStateLive.currentSaveSlot = slot;
    const prefix = `slot${slot}-`;
    // load game state
    Object.keys(NC.Player.gameState).forEach((key) => {
        const value = localStorage.getItem(prefix + key);
        NC.Player.gameState[key] = value !== null ? Number(value) : NC.Player.constants.gameStateDefaults[key];
    });
    // load achievements
    for (let achName of NC.Player.gameStateAch.keys()) {
        const value = localStorage.getItem(`${prefix}ach-${achName}`);
        NC.Player.gameStateAch.set(achName, value === "true");
    }
    document.getElementById("main_saveSlotDisplay").innerHTML = NC.Bootstrap.gameStateLive.currentSaveSlot;
    NC.Multimedia.playSfx("compac");
    NC.Points.setPoints(NC.Player.gameState.points);
    NC.Upgrades.autoClick();
}

// This function is no longer demonic but I forgot to say that when I made it that way
NC.Player.reset = async function(slot) {
    const confirmed = await NC.Ui.confirmC("are you sure?");
    if (!confirmed) { return; }

    const storeItems = document.querySelectorAll(".upgradeDiv");
    if (slot !== "all") {
        const prefix = `slot${slot}-`;
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(prefix)) { localStorage.removeItem(key); }
        });
        if (Number(slot) == NC.Bootstrap.gameStateLive.currentSaveSlot) {
            Object.assign(NC.Player.gameState, NC.Player.constants.gameStateDefaults);
            for (let achName of NC.Player.gameStateAch.keys()) { NC.Player.gameStateAch.set(achName, false); }
            for (const item of storeItems) { item.style.backgroundColor = "var(--bg-color)"; }
            for (const item of storeItems) { item.classList = "upgradeDiv"; }
        }
    } else if (slot == "all") {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme !== null) { localStorage.setItem("theme", theme); }
        Object.assign(NC.Player.gameState, NC.Player.constants.gameStateDefaults);
        for (let achName of NC.Player.gameStateAch.keys()) { NC.Player.gameStateAch.set(achName, false); }
        for (const item of storeItems) { item.style.backgroundColor = "var(--bg-color)"; }
        for (const item of storeItems) { item.classList = "upgradeDiv"; }
    }
    NC.Multimedia.playSfx("trash");
    NC.Points.setPoints(NC.Player.gameState.points);
    NC.Upgrades.autoClick();
}

NC.Player.viewSavedData = function(save) {
    const prefix = `slot${save}-`;
    const keys = [
        "points",
        "pointsPerClick",
        "steroidsPrice",
        "gamblingPrice",
        "autoclickerPower",
        "gamblesWon",
        "gamblingPointsWon",
        "pointsSpent",
        "gamblesLost",
        "gamblingPointsLost",
    ];
    let data = {};
    keys.forEach((key) => { data[key] = localStorage.getItem(prefix + key); });
    let achievements = {};
    for (let achName of NC.Player.gameStateAch.keys()) {
        achievements[achName] = localStorage.getItem(`${prefix}ach-${achName}`);
    }
    NC.Ui.infoC(
        `
        disclaimer: "null" means you have not saved anything\n
        save ${save} contains:\n
        gameState:\n
        ${JSON.stringify(data, null, 2)}\n
        \n
        gameStateAch (achievements):\n
        ${JSON.stringify(achievements, null, 2)}
        `
    );
}

// autosave control
NC.Player.initializeAutosave = function() {
    if (!localStorage.getItem("autosaveEnabled")) { localStorage.setItem("autosaveEnabled", "true"); }
    if (localStorage.getItem("autosaveEnabled") == "true") {
        if (NC.Bootstrap.gameStateLive.currentSaveSlot == null) { NC.Player.load(1); }
        if (!NC.Bootstrap.gameStateLive.autosaveInterval) {
            setTimeout(function() { 
                NC.Bootstrap.gameStateLive.autosaveInterval = setInterval(NC.Player.autosave, 60000);
            }, 60000);
        }
    } else if (localStorage.getItem("autosaveEnabled") == "false") {
        if (NC.Bootstrap.gameStateLive.autosaveInterval) { 
            clearInterval(NC.Bootstrap.gameStateLive.autosaveInterval); 
            NC.Bootstrap.gameStateLive.autosaveInterval = null;
        }
    }
}
NC.Player.autosave = function() {
    NC.Player.save(NC.Bootstrap.gameStateLive.currentSaveSlot);
    NC.Ui.notifC("Game saved.");
}
NC.Player.toggleAutosave = function() {
    if (localStorage.getItem("autosaveEnabled") == "true") {
        localStorage.setItem("autosaveEnabled", "false");
        if (NC.Bootstrap.gameStateLive.autosaveInterval) {
            clearInterval(NC.Bootstrap.gameStateLive.autosaveInterval);
            NC.Bootstrap.gameStateLive.autosaveInterval = null;
        }
    } else if (localStorage.getItem("autosaveEnabled") == "false") {
        localStorage.setItem("autosaveEnabled", "true");
        if (!NC.Bootstrap.gameStateLive.autosaveInterval) {
            setTimeout(function() { 
                NC.Bootstrap.gameStateLive.autosaveInterval = setInterval(NC.Player.autosave, 60000);
            }, 60000);
        }
    }
}

NC.constantsFunction("Player");
