/*
Stuff happening in real time
Autoclick function, clicks per second, alerts, ticks
*/

// splash screen
function splashScreen() {
    let splashScreen = document.createElement("div");
    splashScreen.id = "main_splashScreen";
    splashScreen.innerHTML = data_splashScreen;
    document.body.append(splashScreen);
    setTimeout(() => {
        requestAnimationFrame(() => { splashScreen.classList.add("invisible"); });
        setTimeout(() => { splashScreen.remove(); }, 500);
    }, 2500);
}
splashScreen();

// autoclicker handling
function autoClick() {
    if (gameState.autoclickerPower <= 0) { return; }
    playSfx("sfx_clangSound");
    gameState.points += gameState.autoclickerPower;
    setPoints(gameState.points);
}
setInterval(autoClick, 1000);

// cps meter handling
setInterval(updateCPS, 1000); // 1 second loop
function trackCPS() { gameStateLive.clickCount++; }
function updateCPS() {
    gameStateLive.cps = gameStateLive.clickCount;
    gameStateLive.clickCount = 0;
    document.getElementById("stat_cpsMeter").innerText = `CPS(clicks per second): ${gameStateLive.cps} ::`;
}

// audio sliders
{
    const sfxElements = Array.from(document.querySelectorAll('audio[id^="sfx_"]'));
    function setSfxVol(value) {
        const volume = value / 100;
        for (const el of sfxElements) {
            el.volume = volume;
        }
        document.getElementById("sfx_sfxValue").innerText = value;
        localStorage.setItem("sfxVolume", value);
    }
}

// anim
function animateElement(id, animClass) {
    const elem = document.getElementById(id);
    if (!elem) {
        console.error(`Element "${id}" to animate not found.`);
        return;
    }
    elem.classList.remove("pop", "fadeInOut");
    void elem.offsetWidth;
    elem.classList.add(animClass);

    elem.addEventListener("animationend", function handler() {
        elem.classList.remove(animClass);
        elem.removeEventListener("animationend", handler);
    });
}
function animateElements(elements, animClass) {
    elements.forEach((id) => animateElement(id, animClass));
}

// audio
function playSfx(sfx) {
    const sfxHTML = document.getElementById(sfx);
    if (sfxHTML) {
        sfxHTML.currentTime = 0;
        sfxHTML.play();
    } else { return console.error(`Could not find "${sfx}" element to play`); }
}
function playSfxRandomPitch(sfx) {
    const sfxHTML = document.getElementById(sfx);
    if (sfxHTML) {
        sfxHTML.playbackRate = 0.6 + Math.random() * 0.5;
        sfxHTML.currentTime = 0;
        sfxHTML.play();
    } else { return console.error(`Could not find "${sfx}" element to play`); }
}

// menu and stats
function menuLoad(option) {
    const menu = document.getElementById("main_menu");
    if (option === "data_home") {
        menu.innerHTML = data_menuButtons + data_home;
        document.getElementById("menu_homeVersion").innerText = gameStateLive.version;
    } else if (option === "data_stats") {
        menu.innerHTML = data_menuButtons + data_stats;
        setTimeout(() => { updateStatMeters(); }, 0);
    } else if (option === "data_achievements") {
        menu.innerHTML = data_menuButtons + data_achievements;
        setTimeout(() => { updateStatMeters(); }, 0);
    } else if (option === "data_options") {
        menu.innerHTML = data_menuButtons + data_options;
        setTimeout(() => { updateStatMeters(); }, 0);
    } else { console.error("Bad parameter."); }
}
document.addEventListener("DOMContentLoaded", () => { menuLoad("data_home");  });
function updateStatMeters() {
    // general
    const statPointsElem = document.getElementById("stat_points");
    if (statPointsElem) { statPointsElem.innerText = `points: ${gameState.points}`; }

    const cpElem = document.getElementById("stat_CPower");
    if (cpElem) { cpElem.innerText = `click power: ${gameState.pointsPerClick} point(s)`; }

    const acElem = document.getElementById("stat_ACPower");
    if (acElem) { acElem.innerText = `autoclicks per second: ${gameState.autoclickerPower}`; }

    // gains
    const gamblesWonElem = document.getElementById("stat_gamblesWonDisplay");
    if (gamblesWonElem) { gamblesWonElem.innerText = `gambles won: ${gameState.gamblesWon}`; }

    const gamblingPointsWonElem = document.getElementById("stat_gamblingPointsWonDisplay");
    if (gamblingPointsWonElem) { gamblingPointsWonElem.innerText = `points won from gambling: ${gameState.gamblingPointsWon}`; }

    // losses
    const ptsSpentElem = document.getElementById("stat_ptsSpentDisplay");
    if (ptsSpentElem) { ptsSpentElem.innerText = `points spent: ${gameState.pointsSpent}`; }

    const gamblesLostElem = document.getElementById("stat_gamblesLostDisplay");
    if (gamblesLostElem) { gamblesLostElem.innerText = `gambles lost: ${gameState.gamblesLost}`; }

    const gamblingPointsLostElem = document.getElementById("stat_gamblingPointsLostDisplay");
    if (gamblingPointsLostElem) { gamblingPointsLostElem.innerText = `points lost from gambling: ${gameState.gamblingPointsLost}`; }

    // achievements
    for (const [achName, unlocked] of gameStateAch.entries()) {
        const achElem = document.getElementById(`ach_${achName}`);
        if (!achElem) continue;
        if (unlocked) {
            achElem.style.opacity = "1";
        } else {
            achElem.style.opacity = "0.5";
        }
    }

    // click power (under point counter) vvvvv
    const cpElemMain = document.getElementById("stat_clickPowerDisplay");
    if (cpElemMain) { cpElemMain.innerText = `click power: ${gameState.pointsPerClick} point(s)`; }

    // prices
    document.getElementById("stritem_steroidsPrice").innerText = `${gameState.steroidsPrice} points`;
    document.getElementById("stritem_gamblingPrice").innerText = `${gameState.gamblingPrice} points`;
    document.getElementById("stritem_cursorCrackPrice").innerText = `${gameState.cursorCrackPrice} points`;
}

// screen boxes
// alert
function alertC(text) {
    let alertBox = document.getElementById("scrbox_alertBox");
    if (!alertBox) {
        document.body.insertAdjacentHTML("beforeend", data_alertBoxHTML);
        alertBox = document.getElementById("scrbox_alertBox");
    }
    const alertBoxContent = document.getElementById("scrbox_alertBoxContent");
    if (alertBoxContent) {
        alertBoxContent.innerText = text;
    }
    alertBox.style.opacity = "1";
    alertBox.style.display = "block";
}
function alertCOK() {
    const alertBox = document.getElementById("scrbox_alertBox");
    if (alertBox) {
        alertBox.style.animation = "fadeOutBody 0.2s";
        setTimeout(() => {
        alertBox.style.display = "none";
        alertBox.style.opacity = "0";
        setTimeout(() => { alertBox.remove(); }, 100);
        }, 200);
    }
}
// confirm
function confirmC(text) {
    return new Promise((resolve) => {
        let confirmBox = document.getElementById("scrbox_confirmBox");
        if (!confirmBox) {
            document.body.insertAdjacentHTML("beforeend", data_confirmBoxHTML);
            confirmBox = document.getElementById("scrbox_confirmBox");
        }
        const confirmBoxContent = document.getElementById("scrbox_confirmBoxContent");
        if (confirmBoxContent) { confirmBoxContent.innerText = text; }
        confirmBox.style.display = "block";
        confirmBox.style.opacity = "1";
        playSfx("sfx_confirmyLialog");

        const close = (result) => {
            confirmBox.style.animation = "fadeOutBody 0.2s";
            setTimeout(() => {
                confirmBox.style.opacity = "0";
                confirmBox.style.display = "none";
                setTimeout(() => { confirmBox.remove(); });
                resolve(result);
            }, 200);
        }

        // hook up buttons
        document.getElementById("scrbox_confirmBoxYes").onclick = () => close(true);
        document.getElementById("scrbox_confirmBoxCancel").onclick = () => close(false);
    });
}
// achievement
function achC(title, description) {
    let achBox = document.getElementById("scrbox_achBox");
    if (!achBox) {
        document.body.insertAdjacentHTML("beforeend", data_achBoxHTML);
        achBox = document.getElementById("scrbox_achBox");
    }
    const achBoxContent = document.getElementById("scrbox_achBoxContent");
    if (achBoxContent) {
        achBoxContent.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
        `;
    }
    achBox.style.opacity = "1";
    achBox.style.display = "block";
    playSfx("sfx_achSound");
    setTimeout(achCHIDE, 4000);
}
function achCHIDE() {
    const achBox = document.getElementById("scrbox_achBox");
    if (achBox) {
        achBox.style.animation = "fadeOutBody 0.4s";
        setTimeout(() => {
        achBox.style.display = "none";
        achBox.style.opacity = "0";
        setTimeout(() => { achBox.remove(); }, 100);
        }, 400);
    }
}
// info
function infoC(text) {
    let infoBox = document.getElementById("scrbox_infoBox");
    if (!infoBox) {
        document.body.insertAdjacentHTML("beforeend", data_infoBoxHTML);
        infoBox = document.getElementById("scrbox_infoBox");
    }
    const infoBoxContent = document.getElementById("scrbox_infoBoxContent");
    if (infoBoxContent) {
        infoBoxContent.innerText = text;
    }
    infoBox.style.opacity = "1";
    infoBox.style.display = "block";
    playSfx("sfx_infoDing");
}
function infoCOK() {
    const infoBox = document.getElementById("scrbox_infoBox");
    if (infoBox) {
        infoBox.style.animation = "fadeOutBody 0.2s";
        setTimeout(() => {
        infoBox.style.display = "none";
        infoBox.style.opacity = "0";
        setTimeout(() => { infoBox.remove(); }, 100);
        }, 200);
    }
}

// acheivements on interval
function checkForAch() {
    // gambling
    if (gameState.gamblesWon >= 1) { ach("firstGamble"); }
    if (gameState.gamblesLost >= 1) { ach("firstGamble"); }
    if (gameState.gamblesLost >= 15) { ach("fifteenGamblesLost"); }
    if (gameState.gamblesLost >= 100) { ach("oneHundredGamblesLost"); }
    if (gameState.gamblesLost >= 500) { ach("fiveHundredGamblesLost"); }
    if (gameState.gamblingPointsLost >= 10000) { ach("tenThousandPointsLostFromGambling"); }
    if (gameState.gamblesWon >= 15) {ach("fifteenGamblesWon"); }
    if (gameState.gamblesWon >= 100) { ach("oneHundredGamblesWon"); }
    if (gameState.gamblesWon >= 500) { ach("fiveHundredGamblesWon"); }
    if (gameState.gamblingPointsWon >= 10000) { ach("tenThousandPointsWonFromGambling"); }

    // steroids
    if (gameState.steroidsUsed >= 10) { ach("tenSteroids"); }
    if (gameState.steroidsUsed >= 100) { ach("oneHundredSteroids"); }
    if (gameState.steroidsUsed >= 1000) { ach("oneThousandSteroids"); }

    // points spent
    if (gameState.pointsSpent >= 1000) { ach("oneThousandPointsSpent"); }
    if (gameState.pointsSpent >= 100000) { ach("oneHundredThousandPointsSpent"); }
    if (gameState.pointsSpent >= 1000000) { ach("oneMillionPointsSpent"); }

    // autoclickers
    const autoclickerIds = [
        "helperman",
        "sunglasses",
        "sweatshopWorker",
        "fedora",
        "warjammer",
        "vrooman",
        "dealer",
        "elmaspet",
        "taxevaiden",
        "masterclicker",
        "timmy",
    ];
    for (const id of autoclickerIds) {
        const elem = document.getElementById(`stritem_${id}`);
        if (elem && elem.classList.contains("purchased")) { ach(id); }
    }

    // autoclicker power
    if (gameState.autoclickerPower >= 1000) { ach("oneThousandAPS"); }
    if (gameState.autoclickerPower >= 100000) { ach("oneHundredThousandAPS"); }
    if (document.getElementById("main_cursorCrackEffectsOverlay")) { ach("cursorCrack"); }
    if (gameState.infinity === "true") { ach("achInfinity"); }
    if (isNaN(gameState.points)) { ach("achNaN"); }
}
setInterval(checkForAch, 2000);

// (attempt at) devtools detection
let lastSize = { width: window.outerWidth, height: window.outerHeight };
function detectDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > 160 || heightDiff > 160) {
        console.warn("The browser tools may be open.");
        document.getElementById("main_pointCounterGradient").style.background = `
            conic-gradient(
                rgba(174, 64, 64, 1),
                rgba(102, 126, 234, 1),
                rgba(141, 213, 42, 1),
                rgba(192, 79, 134, 1),
                rgba(174, 64, 64, 1)
            )
        `;
        clearInterval(detectDevTools);
    }
    lastSize = { width: window.outerWidth, height: window.outerHeight };
}
setInterval(detectDevTools, 500);

// fill in version
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("main_counterLinesVersion").innerText = gameStateLive.version;
    document.getElementById("menu_homeVersion").innerText = gameStateLive.version;
});
