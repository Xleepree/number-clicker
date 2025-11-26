/*
HTML componentstuffs
Not the best way to do it but it works
*/

// splash screen
const data_splashScreen = `
    <img id="main_splashScreenLogo" src="images/main/favicon.png">
    <img id="main_splashScreenLoading" src="images/ui/loading.svg">
`;

// menu
const data_menuButtons = `
    <button onclick="menuLoad('data_home')">home</button>
    <button onclick="menuLoad('data_stats')">stats</button>
    <button onclick="menuLoad('data_achievements')">achievements</button>
    <button onclick="menuLoad('data_options')">options</button>
    <br>
    <br>
`;

const data_home = `
    <span class="menuPage">

        <img class="logoImg" src="images/main/numberClicker.png">
        <h1>num.clicker home</h1>
        <p>clickies for the dopamine</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>mike wahousekey</h2>
                <img src="images/menu/mike-wahousekey.png" class="indicatorImg">
            </div>
            <p>he's here<br>
            <small>heehehehehe</small></p>
        </div>

        <div style="text-align: center">
            <div class="menuPageDivHeader">
                <h2>latest changelog</h2>
                <img src="images/menu/latest-changelog.png" class="indicatorImg">
            </div>
            <h3 id="menu_homeVersion"></h3>
            <a href="https://github.com/Xleepree/number-clicker/releases">GitHub</a>
        </div>

    </span>
`;

const data_stats = `
    <span class="menuPage">

        <img src="images/menu/stats.png" class="pageIndicatorImg">
        <h1>stats</h1>
        <p>how are you doing?</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>general</h2>
                <img src="images/menu/general-stats.png" class="indicatorImg">
            </div>
            <p id="stat_points">points: 0</p>
            <p id="stat_CPower">click power: 1 point(s)</p>
            <p id="stat_ACPower">autoclicks per second: 0</p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>gains</h2>
                <img src="images/menu/gains.png" class="indicatorImg">
            </div>
            <p id="stat_gamblesWonDisplay">gambles won: 0</p>
            <p id="stat_gamblingPointsWonDisplay">points won from gambling: 0</p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>losses</h2>
                <img src="images/menu/losses.png" class="indicatorImg">
            </div>
            <p id="stat_ptsSpentDisplay">points spent: 0</p>
            <p id="stat_gamblesLostDisplay">gambles lost: 0</p>
            <p id="stat_gamblingPointsLostDisplay">points lost from gambling: 0</p>
        </div>

    </span>
`;

const data_achievements = `
    <span class="menuPage">

        <img src="images/menu/achievements.png" class="pageIndicatorImg">
        <h1>achievements</h1>
        <p>congratulations</p>

        <hr>

        <div class="achsContainer">

            <div id="ach_tenSteroids">
                <h2>Steroid abuse</h2>
                <p>Take steroids ten times.</p>
            </div>

            <div id="ach_oneHundredSteroids">
                <h2>FEEL THE BURN</h2>
                <p>Take steroids one hundred times.</p>
            </div>

            <div id="ach_oneThousandSteroids">
                <h2>Where's the burn</h2>
                <p>Take steroids one thousand times.</p>
            </div>

            <hr>

            <div id="ach_firstGamble">
                <h2>99% of gamblers quit before winning big</h2>
                <p>Gamble for the first time.</p>
            </div>

            <hr>

            <div id="ach_fifteenGamblesLost">
                <h2>You should stop... nah jk</h2>
                <p>Lose fifteen gambles.</p>
            </div>

            <div id="ach_oneHundredGamblesLost">
                <h2>Crippling gambling addiction</h2>
                <p>Lose one hundred gambles.</p>
            </div>

            <div id="ach_fiveHundredGamblesLost">
                <h2>Not winning big are you... you look so dumb LOL</h2>
                <p>Lose five hundred gambles.</p>
            </div>

            <div id="ach_tenThousandPointsLostFromGambling">
                <h2>Ten thousand reasons to probably keep gambling</h2>
                <p>Lose ten thousand points gambling.</p>
            </div>

            <hr>

            <div id="ach_fifteenGamblesWon">
                <h2>Keep gambling champ, nothing could possibly go wrong</h2>
                <p>Win fifteen gambles.</p>
            </div>

            <div id="ach_oneHundredGamblesWon">
                <h2>Wait stop I hate you stop please I want my points back PLEASE</h2>
                <p>Win one hundred gambles.</p>
            </div>

            <div id="ach_fiveHundredGamblesWon">
                <h2>I can't feed a family on negative numbers man</h2>
                <p>Win five hundred gambles.</p>
            </div>

            <div id="ach_tenThousandPointsWonFromGambling">
                <h2>Stop gambling I want your points</h2>
                <p>Win ten thousand points gambling.</p>
            </div>

            <div id="ach_extremeGambling">
                <h2>J-A-C-K-P-O-T-!</h2>
                <p>Win at extreme gambling.</p>
            </div>

            <hr>

            <div id="ach_oneThousandPointsSpent">
                <h2>Stop wasting money on food Sarah, I want my 8K-Ultra-High-Definiton YouTube back</h2>
                <p>Spend one thousand points.</p>
            </div>

            <div id="ach_oneHundredThousandPointsSpent">
                <h2>I wasn't joking Sarah</h2>
                <p>Spend one hundred thousand points.</p>
            </div>

            <div id="ach_oneMillionPointsSpent">
                <h2>Sarah where did you go</h2>
                <p>Spend one million points.</p>
            </div>

            <hr>

            <div id="ach_sweatshopWorker">
                <h2>Top-notch ethics</h2>
                <p>Purchase the Sweatshop Worker.</p>
            </div>

            <div id="ach_magicalFedora">
                <h2>Magical, m'lady</h2>
                <p>Purchase the Magical Fedora.</p>
            </div>

            <div id="ach_helperMan">
                <h2>Ignore the firearm</h2>
                <p>Purchase the Helper Man.</p>
            </div>

            <div id="ach_masterClicker">
                <h2>Master of clicks, and probably carpal tunnel</h2>
                <p>Purchase the Master Clicker.</p>
            </div>

            <hr>

            <div id="ach_oneThousandAPS">
                <h2>Points coming to you from - not slaves, I swear</h2>
                <p>Reach one thousand autoclicks per second.</p>
            </div>

            <div id="ach_oneHundredThousandAPS">
                <h2>EMPIRE!</h2>
                <p>Reach one hundred thousand autoclicks per second.</p>
            </div>

            <hr>

            <div id="ach_fentanyl">
                <h2>Oh HELL no</h2>
                <p>Use ... Fentanyl.</p>
            </div>

            <div id="ach_cursorCrack">
                <h2>Digital substance abuse</h2>
                <p>Use the Cursor Crack.</p>
            </div>

            <div id="ach_achNaN">
                <h2>Oops</h2>
                <p>Your points have become NaN. Please report this issue in detail to the GitHub repo.</p>
            </div>

            <div id="ach_achInfinity">
                <h2>End of the line buddy boy, ya ran out of bits</h2>
                <p>Reach the 32-bit integer limit. ("Infinity")</p>
            </div>

        </div>

    </span>
`;

const data_options = `
    <span class="menuPage">

        <img src="images/menu/options.png" class="pageIndicatorImg">
        <h1>options</h1>
        <p>configure the dopamine</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>visual</h2>
                <img src="images/menu/visual.png" class="indicatorImg">
            </div>
            <p>theme
                <button onclick="setTheme('')">light</button>
                <button onclick="setTheme('darkTheme')">dark</button>
            </p>
            <p>fullscreen <button id="btn_toggleFullscreen">toggle</button>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>audio</h2>
                <img src="images/menu/audio.png" class="indicatorImg">
            </div>
            <p>SFX
                <input type="range" id="sfx_sfxSlider" min="0" max="100" step="1" value="100"
                oninput="setSfxVol(this.value)">
                <span id="sfx_sfxValue">100</span>
            </p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>saves</h2>
                <img src="images/menu/saves.png" class="indicatorImg">
            </div>
            <div class="saveslotsContainer">

                <div style="border: 2px red solid;">
                    <h3>all</h3>
                    <p style="color: red"><button onclick="reset('all')">reset</button><i> careful!</i></p>
                </div>

                <div>
                    <h3>save one</h3>
                    <button onclick="viewSavedData('1')">view saved data</button>
                    <button onclick="save('1')">save</button>
                    <button onclick="load('1')">load</button>
                    <button onclick="reset('1')">reset</button>
                </div>

                <div>
                    <h3>save two</h3>
                    <button onclick="viewSavedData('2')">view saved data</button>
                    <button onclick="save('2')">save</button>
                    <button onclick="load('2')">load</button>
                    <button onclick="reset('2')">reset</button>
                </div>

                <div>
                    <h3>save three</h3>
                    <button onclick="viewSavedData('3')">view saved data</button>
                    <button onclick="save('3')">save</button>
                    <button onclick="load('3')">load</button>
                    <button onclick="reset('3')">reset</button>
                </div>

            </div>
        </div>

    </span>
`;

// screen boxes
const data_alertBoxHTML = `
    <div id="scrbox_alertBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_alertBoxContent"></span>
        </div>
        <button onclick="alertCOK()" class="alertBoxOK">OK</button>
    </div>
`;
const data_confirmBoxHTML = `
    <div id="scrbox_confirmBox">
        <div style="overflow-y: auto; max-height: 90%; text-align: center;">
            <span id="scrbox_confirmBoxContent"></span>
        </div>
        <span class="confirmOptions">
            <button id="scrbox_confirmBoxYes">YES</button>
            <button id="scrbox_confirmBoxCancel">CANCEL</button>
        </span>
    </div>
`;
const data_achBoxHTML = `
    <div id="scrbox_achBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_achBoxContent"></span>
        </div>
    </div>
`;
const data_infoBoxHTML = `
    <div id="scrbox_infoBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_infoBoxContent"></span>
        </div>
        <button onclick="infoCOK()" class="alertBoxOK">OK</button>
    </div>
`;
const data_notifBoxHTML = `
    <div id="scrbox_notifBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <p id="scrbox_notifBoxContent"></p>
        </div>
    </div>
`;
