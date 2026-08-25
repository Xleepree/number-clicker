NC.HTML.constants.gameMenuStats = `
    <img src="images/menu/stats.png">
    <h1>stats</h1>
    <h2>how are you doing?</h2>
    <hr>
    <div>
        <div class="game-menu-container-header">
            <h2>points</h2>
            <img src="images/menu/stats-points.png">
        </div>
        <p class="stats-single-info">
            <b><span id="textfield_statPoints">0</span></b>
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>click power</h2>
            <img src="images/menu/stats-clickPower.png">
        </div>
        <p class="stats-single-info">
            <b><span id="textfield_statClickPower">0</span></b>
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>autoclicker power</h2>
            <img src="images/menu/stats-autoclickerPower.png">
        </div>
        <p class="stats-single-info">
            <b><span id="textfield_autoclickerPower">0</span></b>
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>points spent</h2>
            <img src="images/menu/stats-pointsSpent.png">
        </div>
        <p class="stats-single-info">
            <b><span id="textfield_pointsSpent">0</span></b>
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>gambling stats</h2>
            <img src="images/menu/stats-gambling.png">
        </div>
        <p>
            gambles won: <b><span id="textfield_gamblesWon">0</span></b><br>
            gambles lost: <b><span id="textfield_gamblesLost">0</span></b><br>
            points won from gambling: <b><span id="textfield_gamblingPointsWon">0</span></b><br>
            points lost from gambling: <b><span id="textfield_gamblingPointsLost">0</span></b>
        </p>
    </div>
`;
NC.HTML.constants.gameMenuAchievements = `
    <img src="images/menu/achievements.png">
    <h1>achievements</h1>
    <h2>congratulations</h2>
    <hr>
`;
NC.HTML.constants.gameMenuOptions = `
    <img src="images/menu/options.png">
    <h1>options</h1>
    <h2>configure the dopamine</h2>
    <hr>
    <div>
        <div class="game-menu-container-header">
            <h2>visual</h2>
            <img src="images/menu/visual.png">
        </div>
        <p>
            theme:
            <button id="button_lightMode" onclick="NC.Handlers.changeTheme('light')">light</button>
            <button id="button_darkMode" onclick="NC.Handlers.changeTheme('dark')">dark</button><br>
            fullscreen: <button id="button_fullscreen" onclick="NC.Handlers.toggleFullscreen()">toggle</button>
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>audio</h2>
            <img src="images/menu/audio.png">
        </div>
        <p>
            SFX volume: <span id="textfield_sfxVolume">100</span> 
            <input type="range" id="button_sfxVolume" min="0" max="100" step="1" value="100"
            oninput="NC.Handlers.changeSfxVolume(this.value)">
        </p>
    </div>

    <div>
        <div class="game-menu-container-header">
            <h2>storage</h2>
            <img src="images/menu/storage.png">
        </div>
        <p>autosave: <button id="button_autosave" onclick="NC.Handlers.toggleAutosave()">off</button></p>
        <div id="page_saveSlotsConfig">
            <div id="page_saveSlotsConfigAll">
                <p><b>all</b></p>
                <button id="button_saveSlotsConfigAllReset" onclick="NC.Handlers.resetSlot('all')">reset</button>
            </div>

            <div id="page_saveSlotsConfig1">
                <p><b>1</b></p>
                <button id="button_saveSlotsConfig1Save" onclick="NC.Handlers.saveSlot('1')">save</button>
                <button id="button_saveSlotsConfig1Load" onclick="NC.Handlers.loadSlot('1')">load</button>
                <button id="button_saveSlotsConfig1Reset" onclick="NC.Handlers.resetSlot('1')">reset</button>
            </div>

            <div id="page_saveSlotsConfig2">
                <p><b>2</b></p>
                <button id="button_saveSlotsConfig2Save" onclick="NC.Handlers.saveSlot('2')">save</button>
                <button id="button_saveSlotsConfig2Load" onclick="NC.Handlers.loadSlot('2')">load</button>
                <button id="button_saveSlotsConfig2Reset" onclick="NC.Handlers.resetSlot('2')">reset</button>
            </div>

            <div id="page_saveSlotsConfig3">
                <p><b>3</b></p>
                <button id="button_saveSlotsConfig3Save" onclick="NC.Handlers.saveSlot('3')">save</button>
                <button id="button_saveSlotsConfig3Load" onclick="NC.Handlers.loadSlot('3')">load</button>
                <button id="button_saveSlotsConfig3Reset" onclick="NC.Handlers.resetSlot('3')">reset</button>
            </div>
        </div>
    </div>

    <hr>

    <div>
        <div class="game-menu-container-header">
            <h2>info</h2>
            <img src="images/menu/mike-wahousekey.png">
        </div>
        <p>
            <b>number clicker</b><br>
            clickies for the dopamine<br>
            <br>
            a project of <a href="https://xleepree.pages.dev/projects">Studio Xleepree</a><br>
            <a href="https://github.com/Xleepree/number-clicker">number-clicker</a> on GitHub<br>
            <br>
            © 2026 Xleepree, some rights reserved (MIT)
        </p>
    </div>
`;

NC.HTML.constants.splashScreen = `
    <img id="page_splashScreenLogo" src="images/numberClicker.png">
`;