// main acheivement function
NC.Ach.ach = function(ach) {
    let fnAch = NC.Ach.constants.achList[ach];
    if (!fnAch) {
        console.warn(`achievement "${ach}" not found in achList`);
        return;
    }
    let fnAchTitle = fnAch[0];
    let fnAchDescription = fnAch[1];
    if (NC.Player.gameStateAch.get(ach)) { return; }
    NC.Player.gameStateAch.set(ach, true);
    NC.Bootstrap.gameStateLive.achCheckNeeded = true;
    NC.Ui.achC(fnAchTitle, fnAchDescription);
}

// criteria for acheivements
NC.Ach.checkForAch = function() {
    if (!NC.Bootstrap.gameStateLive.achCheckNeeded) {
        return;
    } else {
        // gambling
        if (NC.Player.gameState.gamblesWon >= 1) { NC.Ach.ach("firstGamble"); }
        if (NC.Player.gameState.gamblesLost >= 1) { NC.Ach.ach("firstGamble"); }
        if (NC.Player.gameState.gamblesLost >= 15) { NC.Ach.ach("fifteenGamblesLost"); }
        if (NC.Player.gameState.gamblesLost >= 100) { NC.Ach.ach("oneHundredGamblesLost"); }
        if (NC.Player.gameState.gamblesLost >= 500) { NC.Ach.ach("fiveHundredGamblesLost"); }
        if (NC.Player.gameState.gamblingPointsLost >= 10000) { NC.Ach.ach("tenThousandPointsLostFromGambling"); }
        if (NC.Player.gameState.gamblesWon >= 15) { NC.Ach.ach("fifteenGamblesWon"); }
        if (NC.Player.gameState.gamblesWon >= 100) { NC.Ach.ach("oneHundredGamblesWon"); }
        if (NC.Player.gameState.gamblesWon >= 500) { NC.Ach.ach("fiveHundredGamblesWon"); }
        if (NC.Player.gameState.gamblingPointsWon >= 10000) { NC.Ach.ach("tenThousandPointsWonFromGambling"); }
        if (NC.Player.gameState.extremeGamblingWon == true) { NC.Ach.ach("extremeGambling"); }
        // steroids
        if (NC.Player.gameState.steroidsUsed >= 10) { NC.Ach.ach("tenSteroids"); }
        if (NC.Player.gameState.steroidsUsed >= 100) { NC.Ach.ach("oneHundredSteroids"); }
        if (NC.Player.gameState.steroidsUsed >= 1000) { NC.Ach.ach("oneThousandSteroids"); }
        // points spent
        if (NC.Player.gameState.pointsSpent >= 1000) { NC.Ach.ach("oneThousandPointsSpent"); }
        if (NC.Player.gameState.pointsSpent >= 100000) { NC.Ach.ach("oneHundredThousandPointsSpent"); }
        if (NC.Player.gameState.pointsSpent >= 1000000) { NC.Ach.ach("oneMillionPointsSpent"); }

        // autoclickers
        const autoclickerIds = [
            "helperMan",
            "sunglasses",
            "sweatshopWorker",
            "magicalFedora",
            "warjammer",
            "vrooman",
            "dealer",
            "elmaspet",
            "taxevaiden",
            "masterClicker",
            "timmy",
        ];
        for (const id of autoclickerIds) {
            const elem = document.getElementById(`stritem_${id}`);
            if (elem && elem.classList.contains("purchased")) { NC.Ach.ach(id); }
        }

        // autoclicker power
        if (NC.Player.gameState.autoclickerPower >= 1000) { NC.Ach.ach("oneThousandAPS"); }
        if (NC.Player.gameState.autoclickerPower >= 100000) { NC.Ach.ach("oneHundredThousandAPS"); }

        if (NC.Player.gameState.fentanylUsed == true) { NC.Ach.ach("fentanyl"); }
        if (document.getElementById("main_cursorCrackEffectsOverlay")) { NC.Ach.ach("cursorCrack"); }
        if (NC.Player.gameState.infinity === "true") { NC.Ach.ach("achInfinity"); }
        if (isNaN(NC.Player.gameState.points)) { NC.Ach.ach("achNaN"); }

        NC.Bootstrap.gameStateLive.achCheckNeeded = false;
    }
}

// the achievements
NC.Ach.constants.achList = {
    // gambling
    firstGamble: [
        "99% of gamblers quit before winning big",
        "Gamble for the first time."
    ],
    fifteenGamblesLost: [
        "You should stop... nah jk",
        "Lose fifteen gambles."
    ],
    oneHundredGamblesLost: [
        "Crippling gambling addiction",
        "Lose one hundred gambles."
    ],
    fiveHundredGamblesLost: [
        "Not winning big are you... you look so dumb LOL",
        "Lose five hundred gambles."
    ],
    tenThousandPointsLostFromGambling: [
        "Ten thousand reasons to probably keep gambling",
        "Lose ten thousand points gambling."
    ],
    fifteenGamblesWon: [
        "Keep gambling champ, nothing could possibly go wrong",
        "Win fifteen gambles."
    ],
    oneHundredGamblesWon: [
        "Wait stop I hate you stop please I want my points back PLEASE",
        "Win one hundred gambles."
    ],
    fiveHundredGamblesWon: [
        "I can't feed a family on negative numbers man",
        "Win five hundred gambles."
    ],
    tenThousandPointsWonFromGambling: [
        "Stop gambling I want your points",
        "Win ten thousand points gambling."
    ],
    extremeGambling: [
        "J-A-C-K-P-O-T-!",
        "Win at extreme gambling."
    ],

    // steroids
    tenSteroids: [
        "Steroid abuse",
        "Take steroids ten times."
    ],
    oneHundredSteroids: [
        "FEEL THE BURN",
        "Take steroids one hundred times."
    ],
    oneThousandSteroids: [
        "Where's the burn",
        "Take steroids one thousand times."
    ],

    // points spent
    oneThousandPointsSpent: [
        "Stop wasting money on food Sarah, I want my 8K-Ultra-High-Definiton YouTube back",
        "Spend one thousand points."
    ],
    oneHundredThousandPointsSpent: [
        "I wasn't joking Sarah",
        "Spend one hundred thousand points."
    ],
    oneMillionPointsSpent: [
        "Sarah where did you go",
        "Spend one million points."
    ],

    // autoclickers
    helperman: [
        "Ignore the firearm",
        "Purchase the Helper Man."
    ],
    sunglasses: [
        "Tint",
        "Purchase the Sunglasses."
    ],
    sweatshopWorker: [
        "Top-notch ethics",
        "Purchase the Sweatshop Worker."
    ],
    fedora: [
        "Magical, m'lady",
        "Purchase the Magical Fedora."
    ],
    warjammer: [
        "I SWEAR it's strawberry jam",
        "Purchase the Warjammer."
    ],
    vrooman: [
        "He goes vroom vroom, and beep beep",
        "Purchase the Vrooman."
    ],
    dealer: [
        "Let's make a deal, kid",
        "Purchase The Dealer."
    ],
    elmaspet: [
        "Miller miner minor",
        "Purchase elmaspet."
    ],
    taxevaiden: [
        "console.log(`what's up`)",
        "Purchase taxevaiden."
    ],
    masterClicker: [
        "Master of clicks, and probably carpal tunnel",
        "Purchase the Master Clicker."
    ],
    timmy: [
        "Scene not safe",
        "Purchase Timmy."
    ],

    // aps (autoclicks per second)
    oneThousandAPS: [
        "Points coming to you from - not slaves, I swear",
        "Reach one thousand autoclicks per second."
    ],
    oneHundredThousandAPS: [
        "EMPIRE!",
        "Reach one hundred thousand autoclicks per second."
    ],

    fentanyl: [
        "Oh HELL no",
        "Use ... Fentanyl."
    ],

    cursorCrack: [
        "Digital substance abuse", 
        "Use the Cursor Crack."
    ],

    achNaN: [
        "Oops",
        "Your points have become NaN. Please report this issue in detail to the GitHub repo."
    ],

    achInfinity: [
        "End of the line buddy boy, ya ran out of bits",
        'Reach the 32-bit integer limit. ("Infinity")'
    ],
};

NC.constantsFunction("Ach");