/* 
Save control and game state for numberclicker
uses localStorage to store gameState and gameStateAch in save slots
*/

let gameState = {
    points: Number(document.getElementById("main_points").innerText), // 0
    pointsPerClick: 1, // click power
    steroidsPrice: 100,
    cursorCrackPrice: 50,
    gamblingPrice: 150,
    autoclickerPower: 0,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0
}

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

    ["achNaN", false],
    ["achInfinity", false]
]);

let gameStateLive = {
    currentSaveSlot: null, // no save loaded
    clickCount: 0, // cps meter idle
    cps: 0, // clicks per second
    autoclickerInterval: 0 // autoclicker off
}

const gameStateDefaults = {
    points: 0,
    pointsPerClick: 1,
    steroidsPrice: 100,
    gamblingPrice: 150,
    autoclickerPower: 0,
    gamblesWon: 0,
    gamblingPointsWon: 0,
    pointsSpent: 0,
    gamblesLost: 0,
    gamblingPointsLost: 0
}

function setSlot(slotNumber) {
    gameStateLive.currentSaveSlot = slotNumber;
    load(slotNumber);
}

function save(slot) {
    const prefix = `slot${slot}-`;

    // save game state
    Object.keys(gameState).forEach(key => {
        localStorage.setItem(prefix + key, gameState[key]);
    });

    // save achievements
    for (let [achName, value] of gameStateAch.entries()) {
        localStorage.setItem(`${prefix}ach-${achName}`, value);
    }
}

function load(slot) {
    gameStateLive.currentSaveSlot = slot;
    const prefix = `slot${slot}-`;

    // load game state
    Object.keys(gameState).forEach(key => {
        const value = localStorage.getItem(prefix + key);
        gameState[key] = value !== null ? Number(value) : gameStateDefaults[key];
    });

    // load achievements
    for (let achName of gameStateAch.keys()) {
        const value = localStorage.getItem(`${prefix}ach-${achName}`);
        gameStateAch.set(achName, value === "true");
    }

    // dev mode
    if (localStorage.getItem(`${prefix}dev`) === "true") {
        initializeDev();
    }

    setPoints(gameState.points);
    autoClick();
}

// This function is demonic. READ IT VERY CAREFULLY
function reset(slot) {
    confirmCSolved = null;
    confirmC("are you sure?");
    const wait = setInterval(() => {
        if (confirmCSolved !== null) {
            clearInterval(wait);
            if (confirmCSolved == true) {
                if (slot !== "all") {
                    const prefix = `slot${slot}-`;
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith(prefix)) { localStorage.removeItem(key) };
                    });

                    if (Number(slot) !== gameStateLive.currentSaveSlot) { 
                        Object.assign(gameState, gameStateDefaults);
                        for (let achName of gameStateAch.keys()) { gameStateAch.set(achName, false); }
                    }
                } else if (slot == "all") {
                    const theme = localStorage.getItem("theme");
                    localStorage.clear();
                    if (theme !== null) { localStorage.setItem("theme", theme) };
                    Object.assign(gameState, gameStateDefaults);
                    for (let achName of gameStateAch.keys()) { gameStateAch.set(achName, false); }
                }

                setPoints(gameState.points);
                autoClick();
                updateStatMeters();
            }
        }
    }, 100);
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
    keys.forEach(key => {
        data[key] = localStorage.getItem(prefix + key);
    });
    let achievements = {};
    for (let achName of gameStateAch.keys()) {
        achievements[achName] = localStorage.getItem(`${prefix}ach-${achName}`);
    }
    alertC(
        `
        disclaimer: "null" means you have not saved anything\n 
        save ${save} contains:\n
        \n
        gameState:\n
        ${JSON.stringify(data, null, 2)}\n
        \n
        gameStateAch (achievements):\n
        ${JSON.stringify(achievements, null, 2)}
        `
    );
}