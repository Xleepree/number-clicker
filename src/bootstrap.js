(function() {
    window.onerror = function (msg, src, line, col) {
        halt(`"${msg}" :: ${src}:${line}:${col}`);
        return true;
    }
    window.onunhandledrejection = function (event) {
        halt(`Unhandled Promise rejection: ${event.reason}`);
    }
    function halt(haltInfo) {
        const haltElementHTML = `
            <img id="main_haltIcon" src="images/ui/halt-icon.png">
            <p id="main_haltInfo"></p>
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
            #main_haltInfo {
                color: black;
                font-family: 'JetBrains Mono', monospace !important;
                margin-bottom: 5em;
            }
            #main_haltLoading {
                width: 3em;
                animation: backgroundSpin 1s linear infinite;
                filter: invert(100);
            }
        `;
        document.head.append(haltStyles);

        let haltElement = document.createElement("div");
        haltElement.id = "main_halt";
        haltElement.innerHTML = haltElementHTML;
        document.body.append(haltElement);
        document.getElementById("main_haltInfo").innerHTML = `<b>number clicker halted: </b>${haltInfo || "unknown error"}`;

        // kill everything
        window.setTimeout = window.setInterval = window.requestAnimationFrame = function() { return null; }
        document.addEventListener = document.removeEventListener = () => {};
        window.addEventListener = () => {};
    }
})();