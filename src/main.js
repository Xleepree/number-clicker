/*
Main stuffs
Points, upgrades, autoclickers, themes
*/

// point control
function setPoints(newPoints) {
    const pointsElem = document.getElementById("main_points");
    gameState.points = newPoints;
    pointsElem.innerText = gameState.points;
    animateElement("main_points", "pop");
    const statPointsElem = document.getElementById("stat_points");
    if (statPointsElem) { statPointsElem.innerText = `points: ${gameState.points}`; }
}

function increasePoints() {
    playSfxRandomPitch("sfx_clickSound");

    gameState.points += gameState.pointsPerClick;
    setPoints(gameState.points);

    if (gameState.points === Infinity) {
        alertC("congratulations! You've reached Infinity");
        gameState.infinity = "true";
    } else if (isNaN(gameState.points)) {
        alertC("Number is NaN. Something went wrong.");
        console.log("Points are no longer a number. (NaN)");
    }

    trackCPS();
}

function deductPoints(x) {
    gameState.points -= x;
    gameState.pointsSpent += x;
    setPoints(gameState.points);
    updateStatMeters();
}

// upgrade control
function insufficientPoints() {
    alertC("not enough points.");
    playSfx("sfx_badAlertSound");
}
function purchaseAutoclicker({ id, cost, powerGain, sound = null }) {
    if (gameState.points < cost) { return insufficientPoints(); }
    deductPoints(cost);
    gameState.autoclickerPower += powerGain;
    const item = document.getElementById(`stritem_${id}`);
    if (item) {
        item.style.backgroundColor = "var(--upgrade-active)";
        item.classList.add("purchased");
        item.onclick = null;
    } else {
        return console.error(`Store item "${item}" does not exist`);
    }
    autoClick();
    updateStatMeters();
    if (sound) {
        playSfx(sound);
    }
}
// steroids
function injectSteroids() {
    if (gameState.points >= gameState.steroidsPrice) {
        deductPoints(gameState.steroidsPrice);
        setPoints(gameState.points);
        gameState.pointsPerClick += 1;
        gameState.steroidsPrice *= 2;
        updateStatMeters();
        playSfx("sfx_syringe");
        gameState.steroidsUsed++;
    } else { return insufficientPoints(); }
}
// cursor crack
function mmmCrack() {
    if (gameState.points >= gameState.cursorCrackPrice) {
        deductPoints(gameState.cursorCrackPrice);
        setPoints(gameState.points);

        const normalPointsPerClick = gameState.pointsPerClick;

        let bodyEffects = document.createElement("div");
        bodyEffects.id = "main_cursorCrackEffectsOverlay";
        document.body.appendChild(bodyEffects);
        bodyEffects.style.opacity = "1";

        const ceiling = gameState.pointsPerClick * 7;
        gameState.pointsPerClick += Math.floor(
        gameState.pointsPerClick + Math.random() * ceiling);
        gameState.cursorCrackPrice *= 3;
        playSfx("sfx_feelingFunny");
        updateStatMeters();

        setTimeout(() => {
            bodyEffects.style.opacity = "0";
            setTimeout(() => { bodyEffects.remove(); }, 500);
            gameState.pointsPerClick = normalPointsPerClick;
            updateStatMeters();
        }, 5000);
    } else { return insufficientPoints(); }
}
// helper
function helperman() {
    purchaseAutoclicker({
        id: "helperman",
        cost: 500,
        powerGain: 15,
        sound: "sfx_gunCock",
    });
    if (gameState.points >= 500) {
        document.getElementById("stritem_helpermanImg").src = "images/upgrades/helperman-danger.png";
    }
}
// sunglasses
function sunglasses() {
    purchaseAutoclicker({
        id: "sunglasses",
        cost: 1350,
        powerGain: 37,
        sound: "sfx_ohSnap",
    });
}
// sweatshop worker
function sweatshopWorker() {
    purchaseAutoclicker({
        id: "sweatshopWorker",
        cost: 2500,
        powerGain: 99,
        sound: "sfx_sewing",
    });
}
// fedora
function purchaseFedora() {
    purchaseAutoclicker({
        id: "fedora",
        cost: 5000,
        powerGain: 135,
        sound: "sfx_magick",
    });
}
// warjammer
function warjammer() {
    purchaseAutoclicker({
        id: "warjammer",
        cost: 15000,
        powerGain: 245,
        sound: "sfx_knockou",
    });
}
// vrooman
function vroomingMan() {
    purchaseAutoclicker({
        id: "vrooman",
        cost: 60000,
        powerGain: 440,
        sound: "sfx_freepBeep",
    });
}
// dealer
function dealer() {
    purchaseAutoclicker({
        id: "dealer",
        cost: 300000,
        powerGain: 870,
        sound: "sfx_velcro",
    });
}
// elmaspet
function elmaspet() {
    purchaseAutoclicker({
        id: "elmaspet",
        cost: 1000000,
        powerGain: 1969,
        sound: "sfx_boom",
    });
}
// taxevaiden
function tacksEVadion() {
    purchaseAutoclicker({
        id: "taxevaiden",
        cost: 2000000,
        powerGain: 2936,
        sound: "sfx_keyboardy",
    });
}
// masterclicker
function initiateMasterClicker() {
    purchaseAutoclicker({
        id: "masterClicker",
        cost: 10000000,
        powerGain: 10001,
        sound: "sfx_powenup",
    });
}
// timmy
function timmy() {
    purchaseAutoclicker({
        id: "timmy",
        cost: 600000000,
        powerGain: 600000,
        sound: "sfx_whatHaveYouDone",
    });
}
// gambling
function beIrresponsible() {
    const loseChance = 0.55;
    if (gameState.points >= gameState.gamblingPrice) {
        if (Math.random() < loseChance) {
            // lose
            const loss = Math.floor(Math.random() * gameState.points);
            gameState.points -= loss;
            setPoints(gameState.points);
            alertC(`unlucky! lost ${loss} points`);
            gameState.gamblesLost++;
            gameState.gamblingPointsLost += loss;
            playSfx("sfx_mujajaLaugh");
        } else {
            // win
            const win = Math.floor(Math.random() * (gameState.points * 4));
            gameState.points += win;
            setPoints(gameState.points);
            alertC(`lucky you! won ${win} points`);
            gameState.gamblesWon++;
            gameState.gamblingPointsWon += win;
            playSfx("sfx_diceThrow");
        }
        gameState.gamblingPrice *= 9;
        updateStatMeters();
    } else { return insufficientPoints(); }
}

// achievement control
function ach(ach) {
    let fnAch = achList[ach];
    if (!fnAch) {
        console.warn(`achievement "${ach}" not found in achList`);
        return;
    }
    let fnAchTitle = fnAch[0];
    let fnAchDescription = fnAch[1];
    if (gameStateAch.get(ach)) { return; }
    gameStateAch.set(ach, true);
    achC(fnAchTitle, fnAchDescription);
    updateStatMeters();
}
const achList = {
    // gambling
    firstGamble: [
        "99% of gamblers quit before winning big",
        "Gamble for the first time.",
    ],
    fifteenGamblesLost: [
        "You should stop... nah jk",
        "Lose fifteen gambles."
    ],
    oneHundredGamblesLost: [
        "Crippling gambling addiction",
        "Lose one hundred gambles.",
    ],
    fiveHundredGamblesLost: [
        "Not winning big are you... you look so dumb LOL",
        "Lose five hundred gambles.",
    ],
    tenThousandPointsLostFromGambling: [
        "Ten thousand reasons to probably keep gambling",
        "Lose ten thousand points gambling.",
    ],
    fifteenGamblesWon: [
        "Keep gambling champ, nothing could possibly go wrong",
        "Win fifteen gambles.",
    ],
    oneHundredGamblesWon: [
        "Wait stop I hate you stop please I want my points back PLEASE",
        "Win one hundred gambles.",
    ],
    fiveHundredGamblesWon: [
        "I can't feed a family on negative numbers man",
        "Win five hundred gambles.",
    ],
    tenThousandPointsWonFromGambling: [
        "Stop gambling I want your points",
        "Win ten thousand points gambling.",
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
        "Take steroids one thousand times.",
    ],

    // points spent
    oneThousandPointsSpent: [
        "Stop wasting money on food Sarah, I want my 8K-Ultra-High-Definiton YouTube back",
        "Spend one thousand points.",
    ],
    oneHundredThousandPointsSpent: [
        "I wasn't joking Sarah",
        "Spend one hundred thousand points.",
    ],
    oneMillionPointsSpent: [
        "Sarah where did you go",
        "Spend one million points.",
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
        "Reach one thousand autoclicks per second.",
    ],
    oneHundredThousandAPS: [
        "EMPIRE!",
        "Reach one hundred thousand autoclicks per second.",
    ],

    cursorCrack: ["Digital substance abuse", "Use the Cursor Crack."],

    achNaN: [
        "Oops",
        "Your points have become NaN. Please report this issue in detail to the GitHub repo.",
    ],

    achInfinity: [
        "End of the line buddy boy, ya ran out of bits",
        'Reach the 32-bit integer limit. ("Infinity")',
    ],
};

// theme control
function setTheme(theme) {
    document.documentElement.classList.remove("darkTheme");
    if (theme) { document.documentElement.classList.add(theme); }
    localStorage.setItem("theme", theme);
    playSfx("sfx_menuSwitchy");
}
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "";
    if (savedTheme) { document.documentElement.classList.add(savedTheme); }
});
