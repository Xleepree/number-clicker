// session-only runtime state
NC.Bootstrap.gameStateLive = {
    version: "v1.3.2",

    // app flags
    multimediaUnlocked: false,

    // gameplay flags
    achCheckNeeded: false,
    
    // gameplay data
    currentSaveSlot: null, 
    clickCount: 0,
    cps: 0,

    // intervals
    autoclickerInterval: 0,
    autosaveInterval: null
};

(function() {
    // looking for errors
    window.onerror = function (msg, src, line, col) {
        try {
            halt(`"${msg}" :: ${src}:${line}:${col}`);
        } catch (e) {}
        return true;
    }
    window.onunhandledrejection = function (event) {
        try {
            event.preventDefault?.();
            halt(`
                Unhandled Promise rejection: "${event.reason}",,,${event.reason?.stack || "(no stack)"}
            `);
        } catch (e) {}
    }

    // initalization
    document.addEventListener("DOMContentLoaded", () => {
        numberClicker();
    });

    function numberClicker() {
        NC.Ui.splashScreen();

        // main startup
        NC.Ui.initializeTheme();
        NC.Multimedia.loadSfxElements();
        NC.Multimedia.getSfxElementsProperties();
        NC.Multimedia.waitForMultimedia();
        NC.Player.initializeAutosave();
        setInterval(NC.Ach.checkForAch, 4000);
        setInterval(NC.Points.updateCPS, 1000);
        setInterval(NC.Upgrades.autoClick, 1000);
        setInterval(NC.Ui.updateStatMeters, 2000);

        // load ui
        NC.Ui.menuLoad("home");
        NC.Ui.storeLoad("general");
        NC.Ui.fillInVersion();
    }

    // halt: crash if anything goes wrong
    function halt(haltInfo) {
        const haltElementHTML = `
            <img id="main_haltIcon" src="images/ui/halt-icon.png">
            <div id="main_haltInfoContainer">
                <p id="main_haltInfo"></p>
            </div>
            <img id="main_haltLoading" src="images/ui/loading.svg">
        `;
        const haltStyles = document.createElement("style");
        haltStyles.textContent = `
            #main_halt {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: white;
                z-index: 9999;
                display: flex;
                opacity: 1;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            #main_haltIcon {
                width: 40em;
                margin: -10em 0 -10em 0;
            }
            #main_haltInfoContainer {
                display: inline-block;
                margin-bottom: 3em;
                background-color: black;
                max-width: 60em;
                height: 5em;
                overflow: scroll;
            }
            #main_haltInfo {
                color: white;
                font-family: 'JetBrains Mono', monospace !important;
            }
            #main_haltLoading {
                width: 3em;
                animation: backgroundSpin 1s linear infinite;
                filter: invert(100);
            }
        `;
        document.head.append(haltStyles);

        if (!document.getElementById("main_halt")) {
            let haltElement = document.createElement("div");
            haltElement.id = "main_halt";
            haltElement.innerHTML = haltElementHTML;
            document.body.append(haltElement);
        }
        let haltInfoText = document.getElementById("main_haltInfo");
        if (haltInfoText.innerText != "") {
            haltInfoText.append(` + ( ${haltInfo || "unknown error"} )`);
        } else {
            haltInfoText.innerHTML = `( ${haltInfo || "unknown error"} )`;
        }

        // kill everything
        window.setTimeout = window.setInterval = window.requestAnimationFrame = function() { return null; }
        document.addEventListener = document.removeEventListener = () => {};
        window.addEventListener = () => {};
    }
})();

NC.constantsFunction("Bootstrap");
