// splash screen
NC.Data.constants.splashScreen = `
    <img id="main_splashScreenLogo" src="images/main/favicon.png">
    <img id="main_splashScreenLoading" src="images/ui/loading.svg">
`;

// store
NC.Data.constants.storeButtons = `
    <div class="pageHeader">
        <button onclick="NC.Ui.storeLoad('general')" id="btn_storeGeneral">general</button>
        <button onclick="NC.Ui.storeLoad('autoclickers')" id="btn_storeAutoclickers">autoclickers</button>
    </div>
`;
NC.Data.constants.storeGeneral = `
    <span class="storePage">

        <div id="stritem_steroids" onclick="NC.Upgrades.injectSteroids()">
            <img src="images/upgrades/steroids.png">
            <h2>steroids</h2>
            <p>feel the burn<br>
            it hurts</p>
            <p>+1 click power</p>
            <p><small id="stritem_steroidsPrice">100 points</small></p>
        </div>

        <div id="stritem_fentanyl" onclick="NC.Upgrades.uhOhFent()">
            <img src="images/upgrades/fentanyl.png">
            <h2>fentanyl</h2>
            <p>oh my god no<br>
            why</p>
            <p>x2 click power</p>
            <p><small id="stritem_fentanylPrice">500 points</small></p>
        </div>

        <div id="stritem_gambling" onclick="NC.Upgrades.beIrresponsible()">
            <img src="images/upgrades/gambling.png">
            <h2>gambling</h2>
            <p>when in doubt, gamble! Absolutely nothing could go wrong.<br>
            <small>Gamble responsibly.</small><br>
            <br>
            get up to quadruple the amount of points you have!</p>
            <p><small id="stritem_gamblingPrice">150 points</small></p>
        </div>

        <div id="stritem_extremeGambling" onclick="NC.Upgrades.beMoreIrresponsible()">
            <img src="images/upgrades/extremeGambling.png">
            <h2>extreme gambling</h2>
            <p>it's high stakes in this casino. are you going to make that deal?<br>
            <small>Do it, you chicken</small><br>
            <br>
            get up to 20x the amount of points you have! <b>Or lose it all.</b></p>
            <p><small id="stritem_extremeGamblingPrice">250 points</small></p>
        </div>

        <div id="stritem_cursorCrack" onclick="NC.Upgrades.mmmCrack()">
            <img src="images/upgrades/cursorCrack.png">
            <h2>cursor crack</h2>
            <p>mmm GAAHAHAHAHAAH I neeD it.<br>
            <br>
            multiplies your click power by a random integer for 5 seconds</p>
            <p><small id="stritem_cursorCrackPrice">50 points</small></p>
        </div>

    </span>
`;
NC.Data.constants.storeAutoclickers = `
    <span class="storePage">

        <div id="stritem_helperman" onclick="NC.Upgrades.helperman()">
            <img src="images/upgrades/helperman.png" id="stritem_helpermanImg">
            <h2>helper man</h2>
            <p>helper man helps you with the clickies<br>
            it's voluntary, i think<br>
            <br>
            gives you 15 points per second</p>
            <p><small>500 points</small></p>
        </div>

        <div id="stritem_sunglasses" onclick="NC.Upgrades.sunglasses()">
            <img src="images/upgrades/sunglasses.png">
            <h2>sunglasses</h2>
            <p>these sunglasses give you so much aura they give you points<br>
            sick shades bro<br>
            <br>
            gives you 37 points per second <small>hehehehehehe 37</small></p>
            <p><small>1,350 points</small></p>
        </div>

        <div id="stritem_sweatshopWorker" onclick="NC.Upgrades.sweatshopWorker()">
            <img src="images/upgrades/sweatshopworker.png">
            <h2>sweatshop worker</h2>
            <p>straight from the shein sweatshop ready to work<br>
            <br>
            gives you 99 points per second</p>
            <p><small>2,500 points</small></p>
        </div>

        <div id="stritem_fedora" onclick="NC.Upgrades.purchaseFedora()">
            <img src="images/upgrades/hat.png">
            <h2>magical fedora</h2>
            <p>this magical hat will bring points to you!<br>
            <br>
            gives you 135 points per second</p>
            <p><small>5,000 points</small></p>
        </div>

        <div id="stritem_warjammer" onclick="NC.Upgrades.warjammer()">
            <img src="images/upgrades/warjammer.png">
            <h2>warjammer</h2>
            <p>jammer of war<br>
            ignore the strawberry ...jam <small>HAH</small><br>
            <br>
            gives you 245 points per second</p>
            <p><small>15,000 points</small></p>
        </div>

        <div id="stritem_vrooman" onclick="NC.Upgrades.vroomingMan()">
            <img src="images/upgrades/vrooman.png">
            <h2>vrooman</h2>
            <p>My name is vrooman<br>
            I vroom<br>
            <br>
            gives you 440 points per second</p>
            <p><small>60,000 points</small></p>
        </div>

        <div id="stritem_dealer" onclick="NC.Upgrades.dealer()">
            <img src="images/upgrades/dealer.png">
            <h2>the dealer</h2>
            <p>he's got points, just come closer<br>
            <br>
            gives you 870 points per second</p>
            <p><small>300,000 points</small></p>
        </div>

        <div id="stritem_elmaspet" onclick="NC.Upgrades.elmaspet()">
            <img src="images/upgrades/elmaspet.png">
            <h2>elmaspet</h2>
            <p>"my esophagus is not placed correctly"<br>
            fast fingers fable, miller miner minor, big bandit bob<br>
            the whole gang<br>
            <br>
            gives you 1969 points per second</p>
            <p><small>1,000,000 points</small></p>
        </div>

        <div id="stritem_taxevaiden" onclick="NC.Upgrades.tacksEVadion()">
            <img src="images/upgrades/taxevaiden.png">
            <h2>Tax E. Vaiden</h2>
            <p><span style="font-family: 'JetBrains Mono', monospace">
                for (let i = 0; i < 200000; i++) {<br>
                    increasePoints();<br>
                }
            </span><br>
            <br>
            gives you 2936 points per second</p>
            <p><small>2,000,000 points</small></p>
        </div>

        <div id="stritem_masterClicker" onclick="NC.Upgrades.initiateMasterClicker()">
            <img src="images/upgrades/masterclicker.png">
            <h2>master clicker</h2>
            <p>a very good autoclicker that will bring you several thousand points<br>
            <br>
            gives you 10,001 points per second</p>
            <p><small>10,000,000 points</small></p>
        </div>

        <div id="stritem_timmy" onclick="NC.Upgrades.timmy()">
            <img src="images/upgrades/timmy.png">
            <h2>timmy</h2>
            <p>get millions of points with your best friend, Timmy the Eldritch Being!<br>
            Slaughter.<br>
            <br>
            gives you 600,000 points per second</p>
            <p><small>600,000,000 points</small></p>
        </div>

    </span>
`;


// menu
NC.Data.constants.menuButtons = `
    <div class="pageHeader">
        <button onclick="NC.Ui.menuLoad('home')" id="btn_menuHome">home</button>
        <button onclick="NC.Ui.menuLoad('stats')" id="btn_menuStats">stats</button>
        <button onclick="NC.Ui.menuLoad('achievements')" id="btn_menuAchievements">achievements</button>
        <button onclick="NC.Ui.menuLoad('options')" id="btn_menuOptions">options</button>
    </div>
`;
NC.Data.constants.menuHome = `
    <span class="menuPage">

        <img class="logoImg" src="images/main/numberClicker.png">
        <h1>num.clicker home</h1>
        <p><a href="https://xleepree.pages.dev/projects">made by xleepree</a> //
        <a href="https://github.com/Xleepree/number-clicker">repository</a></p>
        <p>clickies for the dopamine</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>mike wahousekey</h2>
                <img src="images/menu/mike-wahousekey.png">
            </div>
            <p>he's here<br>
            <small>heehehehehe</small></p>
        </div>

        <div style="text-align: center">
            <div class="menuPageDivHeader">
                <h2>latest changelog</h2>
                <img src="images/menu/latest-changelog.png">
            </div>
            <h3 id="menu_homeVersion"></h3>
            <a href="https://github.com/Xleepree/number-clicker/releases">GitHub</a>
        </div>

    </span>
`;
NC.Data.constants.menuStats = `
    <span class="menuPage">

        <img src="images/menu/stats.png" class="pageIndicatorImg">
        <h1>stats</h1>
        <p>how are you doing?</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>general</h2>
                <img src="images/menu/general-stats.png">
            </div>
            <p id="stat_points">points: 0</p>
            <p id="stat_CPower">click power: 1 point(s)</p>
            <p id="stat_ACPower">autoclicks per second: 0</p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>gains</h2>
                <img src="images/menu/gains.png">
            </div>
            <p id="stat_gamblesWonDisplay">gambles won: 0</p>
            <p id="stat_gamblingPointsWonDisplay">points won from gambling: 0</p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>losses</h2>
                <img src="images/menu/losses.png">
            </div>
            <p id="stat_ptsSpentDisplay">points spent: 0</p>
            <p id="stat_gamblesLostDisplay">gambles lost: 0</p>
            <p id="stat_gamblingPointsLostDisplay">points lost from gambling: 0</p>
        </div>

    </span>
`;
NC.Data.constants.menuAchievements = `
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
NC.Data.constants.menuOptions = `
    <span class="menuPage">

        <img src="images/menu/options.png" class="pageIndicatorImg">
        <h1>options</h1>
        <p>configure the dopamine</p>

        <hr>

        <div>
            <div class="menuPageDivHeader">
                <h2>visual</h2>
                <img src="images/menu/visual.png">
            </div>
            <p>theme
                <button onclick="NC.Ui.setTheme('')">light</button>
                <button onclick="NC.Ui.setTheme('darkTheme')">dark</button>
            </p>
            <p>fullscreen <button id="btn_toggleFullscreen">toggle</button>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>audio</h2>
                <img src="images/menu/audio.png">
            </div>
            <p>SFX
                <span id="sfx_sfxValue">100 </span>
                <input type="range" id="sfx_sfxSlider" min="0" max="100" step="1" value="100"
                oninput="NC.Multimedia.setSfxVol(this.value)">
            </p>
        </div>

        <div>
            <div class="menuPageDivHeader">
                <h2>saves</h2>
                <img src="images/menu/saves.png">
            </div>
            <p>autosave <b id="stat_autosaveDisplay"></b><button onclick="NC.Player.toggleAutosave()">toggle</button></p>
            <div class="saveslotsContainer">

                <div style="border: 2px red solid;">
                    <h3>all</h3>
                    <p style="color: red"><button onclick="NC.Player.reset('all')">reset</button><i> careful!</i></p>
                </div>

                <div>
                    <h3>save one</h3>
                    <button onclick="NC.Player.viewSavedData('1')">view saved data</button>
                    <button onclick="NC.Player.save('1')">save</button>
                    <button onclick="NC.Player.load('1')">load</button>
                    <button onclick="NC.Player.reset('1')">reset</button>
                </div>

                <div>
                    <h3>save two</h3>
                    <button onclick="NC.Player.viewSavedData('2')">view saved data</button>
                    <button onclick="NC.Player.save('2')">save</button>
                    <button onclick="NC.Player.load('2')">load</button>
                    <button onclick="NC.Player.reset('2')">reset</button>
                </div>

                <div>
                    <h3>save three</h3>
                    <button onclick="NC.Player.viewSavedData('3')">view saved data</button>
                    <button onclick="NC.Player.save('3')">save</button>
                    <button onclick="NC.Player.load('3')">load</button>
                    <button onclick="NC.Player.reset('3')">reset</button>
                </div>

            </div>
        </div>

    </span>
`;

// screen boxes
NC.Data.constants.alertBoxHTML = `
    <div id="scrbox_alertBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_alertBoxContent"></span>
        </div>
        <button onclick="NC.Ui.alertCOK()" class="alertBoxOK">OK</button>
    </div>
`;
NC.Data.constants.confirmBoxHTML = `
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
NC.Data.constants.achBoxHTML = `
    <div id="scrbox_achBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_achBoxContent"></span>
        </div>
    </div>
`;
NC.Data.constants.infoBoxHTML = `
    <div id="scrbox_infoBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <span id="scrbox_infoBoxContent"></span>
        </div>
        <button onclick="NC.Ui.infoCOK()" class="alertBoxOK">OK</button>
    </div>
`;
NC.Data.constants.notifBoxHTML = `
    <div id="scrbox_notifBox">
        <div style="overflow-y: auto; padding-right: 1em; max-height: 90%">
            <p id="scrbox_notifBoxContent"></p>
        </div>
    </div>
`;

NC.constantsFunction("Data");