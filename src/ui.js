// splash screen
NC.Ui.splashScreen = function() {
    let splashScreen = document.createElement("div");
    splashScreen.id = "main_splashScreen";
    splashScreen.innerHTML = NC.Data.constants.splashScreen;
    document.body.append(splashScreen);
    setTimeout(() => {
        requestAnimationFrame(() => { splashScreen.classList.add("invisible"); });
        setTimeout(() => { splashScreen.remove(); }, 500);
    }, 2500);
}

// theme control
NC.Ui.initializeTheme = function() {
    const savedTheme = localStorage.getItem("theme") || "";
    if (savedTheme) { document.documentElement.classList.add(savedTheme); }
}
NC.Ui.setTheme = function(theme) {
    document.documentElement.classList.remove("darkTheme");
    if (theme) { document.documentElement.classList.add(theme); }
    localStorage.setItem("theme", theme);
    NC.Multimedia.playSfx("menuSwitchy");
}

// fill in version
NC.Ui.fillInVersion = function() {
    if (document.getElementById("main_counterLinesVersion")) { document.getElementById("main_counterLinesVersion").innerText = NC.Bootstrap.gameStateLive.version; }
    if (document.getElementById("menu_homeVersion")) { document.getElementById("menu_homeVersion").innerText = NC.Bootstrap.gameStateLive.version; }
};

// (attempt at) devtools detection
NC.Ui.detectDevTools = function() {
    if (NC.Bootstrap.gameStateLive.devToolsDetected) { 
        return;
    } else {
        NC.Bootstrap.gameStateLive.devToolsDetected = true;
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
        }
    }
}

// screen boxes
// alert
NC.Ui.alertC = function(text) {
    let alertBox = document.getElementById("scrbox_alertBox");
    if (!alertBox) {
        document.body.insertAdjacentHTML("beforeend", NC.Data.constants.alertBoxHTML);
        alertBox = document.getElementById("scrbox_alertBox");
    }
    const alertBoxContent = document.getElementById("scrbox_alertBoxContent");
    if (alertBoxContent) {
        alertBoxContent.innerText = text;
    }
    alertBox.style.opacity = "1";
    alertBox.style.display = "block";
}
NC.Ui.alertCOK = function() {
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
NC.Ui.confirmC = function(text) {
    return new Promise((resolve) => {
        let confirmBox = document.getElementById("scrbox_confirmBox");
        if (!confirmBox) {
            document.body.insertAdjacentHTML("beforeend", NC.Data.constants.confirmBoxHTML);
            confirmBox = document.getElementById("scrbox_confirmBox");
        }
        const confirmBoxContent = document.getElementById("scrbox_confirmBoxContent");
        if (confirmBoxContent) { confirmBoxContent.innerText = text; }
        confirmBox.style.display = "block";
        confirmBox.style.opacity = "1";
        NC.Multimedia.playSfx("confirmyLialog");

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
NC.Ui.achC = function(title, description) {
    let achBox = document.getElementById("scrbox_achBox");
    if (!achBox) {
        document.body.insertAdjacentHTML("beforeend", NC.Data.constants.achBoxHTML);
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
    NC.Multimedia.playSfx("achSound");
    setTimeout(NC.Ui.achCHIDE, 4000);
}
NC.Ui.achCHIDE = function() {
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
NC.Ui.infoC = function(text) {
    let infoBox = document.getElementById("scrbox_infoBox");
    if (!infoBox) {
        document.body.insertAdjacentHTML("beforeend", NC.Data.constants.infoBoxHTML);
        infoBox = document.getElementById("scrbox_infoBox");
    }
    const infoBoxContent = document.getElementById("scrbox_infoBoxContent");
    if (infoBoxContent) {
        infoBoxContent.innerText = text;
    }
    infoBox.style.opacity = "1";
    infoBox.style.display = "block";
    NC.Multimedia.playSfx("infoDing");
}
NC.Ui.infoCOK = function() {
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
// notification
NC.Ui.notifC = function(text) {
    let notifBox = document.getElementById("scrbox_notifBox");
    if (!notifBox) {
        document.body.insertAdjacentHTML("beforeend", NC.Data.constants.notifBoxHTML);
        notifBox = document.getElementById("scrbox_notifBox");
    }
    const notifBoxContent = document.getElementById("scrbox_notifBoxContent");
    if (notifBoxContent) {
        notifBoxContent.innerText = text;
    }
    notifBox.style.opacity = "1";
    notifBox.style.display = "block";
    setTimeout(NC.Ui.notifCHIDE, 4000);
}
NC.Ui.notifCHIDE = function() {
    const notifBox = document.getElementById("scrbox_notifBox");
    if (notifBox) {
        notifBox.style.animation = "fadeOutBody 0.4s";
        setTimeout(() => {
            notifBox.style.display = "none";
            notifBox.style.opacity = "0";
            setTimeout(() => { notifBox.remove(); }, 100);
        }, 400);
    }
}

// menu, stats, store
NC.Ui.menuLoad = function(option) {
    const menu = document.getElementById("main_menu");
    switch (option) {
        case "home":
            menu.innerHTML = NC.Data.constants.menuButtons + NC.Data.constants.menuHome;
            NC.Ui.fillInVersion();
            break;
        case "stats":
            menu.innerHTML = NC.Data.constants.menuButtons + NC.Data.constants.menuStats;
            break;
        case "achievements":
            menu.innerHTML = NC.Data.constants.menuButtons + NC.Data.constants.menuAchievements;
            break;
        case "options":
            menu.innerHTML = NC.Data.constants.menuButtons + NC.Data.constants.menuOptions;
            document.getElementById("btn_toggleFullscreen").addEventListener("click", () => {
                NC.Multimedia.toggleWindowFullscreen();
            });
            break;
        default:
            console.error("Not a valid menu option");
            break;
    }
    NC.Multimedia.playSfx("boston", 0.05);
}

NC.Ui.storeLoad = function(category) {
    const store = document.getElementById("main_store");
    switch (category) {
        case "general":
            store.innerHTML = NC.Data.constants.storeButtons + NC.Data.constants.storeGeneral;
            break;
        case "autoclickers":
            store.innerHTML = NC.Data.constants.storeButtons + NC.Data.constants.storeAutoclickers;
            break;
        default:
            console.error("Not a valid store category");
            break;
    }
    NC.Multimedia.playSfx("boston", 0.05);
}

NC.Ui.updateStatMeters = function() {
    // general
    if (document.getElementById("stat_points")) { document.getElementById("stat_points").innerText = `points: ${NC.Player.gameState.points}`; }
    if (document.getElementById("stat_CPower")) { document.getElementById("stat_CPower").innerText = `click power: ${NC.Player.gameState.pointsPerClick} point(s)`; }
    if (document.getElementById("stat_ACPower")) { document.getElementById("stat_ACPower").innerText = `autoclicks per second: ${NC.Player.gameState.autoclickerPower}`; }

    // gains
    if (document.getElementById("stat_gamblesWonDisplay")) { document.getElementById("stat_gamblesWonDisplay").innerText = `gambles won: ${NC.Player.gameState.gamblesWon}`; }
    if (document.getElementById("stat_gamblingPointsWonDisplay")) { document.getElementById("stat_gamblingPointsWonDisplay").innerText = `points won from gambling: ${NC.Player.gameState.gamblingPointsWon}`; }

    // losses
    if (document.getElementById("stat_ptsSpentDisplay")) { document.getElementById("stat_ptsSpentDisplay").innerText = `points spent: ${NC.Player.gameState.pointsSpent}`; }
    if (document.getElementById("stat_gamblesLostDisplay")) { document.getElementById("stat_gamblesLostDisplay").innerText = `gambles lost: ${NC.Player.gameState.gamblesLost}`; }
    if (document.getElementById("stat_gamblingPointsLostDisplay")) { document.getElementById("stat_gamblingPointsLostDisplay").innerText = `points lost from gambling: ${NC.Player.gameState.gamblingPointsLost}`; }

    // achievements
    const achsContainer = document.querySelector(".achsContainer");
    if (achsContainer) {
        for (const [achName, unlocked] of NC.Player.gameStateAch.entries()) {
            const achElem = document.getElementById(`ach_${achName}`);
            if (!achElem) continue;
            achElem.style.opacity = unlocked ? "1" : "0.5";
        }
    }

    // click power (under point counter)
    if (document.getElementById("stat_clickPowerDisplay")) { 
        document.getElementById("stat_clickPowerDisplay").innerHTML = NC.Player.gameState.pointsPerClick == 1 ? `1 point` : `${NC.Player.gameState.pointsPerClick} points`; 
    }

    // prices
    if (document.getElementById("stritem_steroidsPrice")) { document.getElementById("stritem_steroidsPrice").innerText = `${NC.Player.gameState.steroidsPrice} points`; }
    if (document.getElementById("stritem_gamblingPrice")) { document.getElementById("stritem_gamblingPrice").innerText = `${NC.Player.gameState.gamblingPrice} points`; }
    if (document.getElementById("stritem_cursorCrackPrice")) { document.getElementById("stritem_cursorCrackPrice").innerText = `${NC.Player.gameState.cursorCrackPrice} points`; }
    if (document.getElementById("stritem_fentanylPrice")) { document.getElementById("stritem_fentanylPrice").innerText = `${NC.Player.gameState.fentanylPrice} points`; }

    // display for autosave
    if (document.getElementById("stat_autosaveDisplay")) { 
        document.getElementById("stat_autosaveDisplay").innerText = localStorage.getItem("autosaveEnabled") == "true" ? "on " : "off ";
    }

    NC.Ui.fillInVersion();
}

NC.constantsFunction("Ui");