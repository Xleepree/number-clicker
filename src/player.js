/*
Save control and game state for numberclicker
uses localStorage to store gameState and gameStateAch in save slots
*/

let gameState = {
    points: Number(document.getElementById("main_points").innerText), // 0
    infinity: false,
    pointsPerClick: 1, // click power
    autoclickerPower: 0,

    // prices for stuffys
    steroidsPrice: 100,
    cursorCrackPrice: 50,
    gamblingPrice: 150,
    fentanylPrice: 500,

    // extra stats
    steroidsUsed: 0,
    fentanylUsed: false,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0
};

let gameStateAch = new Map([
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

    ["cursorCrack", false],
    ["achNaN", false],
    ["achInfinity", false]
]);

let gameStateLive = {
    currentSaveSlot: null, // no save loaded
    clickCount: 0, // cps meter idle
    cps: 0, // clicks per second
    autoclickerInterval: 0, // autoclicker off
    version: "v1.0.2"
};

const gameStateDefaults = {
    points: 0,
    infinity: false,
    pointsPerClick: 1,
    steroidsPrice: 100,
    steroidsUsed: 0,
    cursorCrackPrice: 50,
    gamblingPrice: 150,
    autoclickerPower: 0,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0
};

function setSlot(slotNumber) {
    gameStateLive.currentSaveSlot = slotNumber;
    load(slotNumber);
}

function save(slot) {
    const prefix = `slot${slot}-`;
    // save game state
    Object.keys(gameState).forEach((key) => {
        localStorage.setItem(prefix + key, gameState[key]);
    });
    // save achievements
    for (let [achName, value] of gameStateAch.entries()) {
        localStorage.setItem(`${prefix}ach-${achName}`, value);
    }
    playSfx("sfx_svribble");
}

function load(slot) {
    if (gameStateLive.currentSaveSlot == slot) {
        alertC(`Save slot ${slot} already loaded.`);
        playSfx("sfx_badAlertSound");
        return;
    }
    gameStateLive.currentSaveSlot = slot;
    const prefix = `slot${slot}-`;
    // load game state
    Object.keys(gameState).forEach((key) => {
        const value = localStorage.getItem(prefix + key);
        gameState[key] = value !== null ? Number(value) : gameStateDefaults[key];
    });
    // load achievements
    for (let achName of gameStateAch.keys()) {
        const value = localStorage.getItem(`${prefix}ach-${achName}`);
        gameStateAch.set(achName, value === "true");
    }
    playSfx("sfx_compac");
    setPoints(gameState.points);
    autoClick();
    updateStatMeters();
}

// This function is demonic. READ IT VERY CAREFULLY
async function reset(slot) {
    const confirmed = await confirmC("are you sure?");
    if (!confirmed) { return; }

    const storeItems = document.querySelectorAll(".upgradeDiv");
    if (slot !== "all") {
        const prefix = `slot${slot}-`;
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(prefix)) { localStorage.removeItem(key); }
        });
        if (Number(slot) == gameStateLive.currentSaveSlot) {
            Object.assign(gameState, gameStateDefaults);
            for (let achName of gameStateAch.keys()) { gameStateAch.set(achName, false); }
            for (const item of storeItems) { item.style.backgroundColor = "var(--bg-color)"; }
            for (const item of storeItems) { item.classList = "upgradeDiv"; }
        }
    } else if (slot == "all") {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme !== null) { localStorage.setItem("theme", theme); }
        Object.assign(gameState, gameStateDefaults);
        for (let achName of gameStateAch.keys()) { gameStateAch.set(achName, false); }
        for (const item of storeItems) { item.style.backgroundColor = "var(--bg-color)"; }
        for (const item of storeItems) { item.classList = "upgradeDiv"; }
    }
    playSfx("sfx_trash");
    setPoints(gameState.points);
    autoClick();
    updateStatMeters();
}

function viewSavedData(save) {
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
    for (let achName of gameStateAch.keys()) {
        achievements[achName] = localStorage.getItem(`${prefix}ach-${achName}`);
    }
    infoC(
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
