NC.GameModel.runtime = {
    clickCount: 0,
    cps: 0
}

NC.GameModel.core = {
    // core
    points: 0,
    infinity: false,
    clickPower: 1,
    autoclickerPower: 0,

    // stats
    steroidsUsed: 0,
    fentanylUsed: false,
    gamblesWon: 0,
    gamblesLost: 0,
    gamblingPointsWon: 0,
    gamblingPointsLost: 0,
    pointsSpent: 0,
    extremeGamblingWon: false,
    cursorCrackUsed: false
}
NC.GameModel.constants.coreDefault = 
    structuredClone(NC.GameModel.core);

NC.GameModel.store = {
    general: {
        steroids: {
            name: "steroids",
            desc: `
                feel the burn<br>
                it hurts<br>
                <br>
                +1 click power
            `,
            price: 100,
            available: true,
            itemInfo: ["steroids", "general"]
        },

        fentanyl: {
            name: "fentanyl",
            desc:  `
                "Youse keep talking about them poors on the street.
                How about we give them some FREE FENT."<br>
                "Excuse me?"<br>
                "You heard me. Let's give them filthy poors some FREE FENT."<br>
                "...What?"<br>
                "FREE FENT."<br>
                - Colonel Long John Woo, 37 BC<br>
                <br>
                x2 click power
            `,
            price: 500,
            available: true,
            itemInfo: ["fentanyl", "general"]
        },

        gambling: {
            name: "gambling",
            desc: `
                casino's empty anyway, with all them folks headed over to that
                fabled "Stock Market"... might as well make use of it<br>
                <small>Gamble responsibly.</small><br>
                <br>
                get up to quadruple the amount of points you have!
            `,
            price: 150,
            available: true,
            itemInfo: ["gambling", "general"]
        },

        extremeGambling: {
            name: "extreme gambling",
            desc: `
                IT'S HIGH STAKES IN THIS CASINO. are you going to place that bet?<br>
                <small>Do it, you chicken</small><br>
                <br>
                get up to 20x the amount of points you have! <b>Or lose it all.</b>
            `,
            price: 250,
            available: true,
            itemInfo: ["extremeGambling", "general"]
        },

        cursorCrack: {
            name: "cursor crack",
            desc: `
                Yass. Let me smoke and snort, like any good politician...<br>
                <br>
                boosts your click power for 5 seconds
            `,
            price: 50,
            available: true,
            itemInfo: ["cursorCrack", "general"]
        }
    },
    autoclickers: {
        helperman: {
            name: "helper man",
            desc: `
                helper man, is volunteer<br>
                Or so they Say.<br>
                <br>
                gives you 15 points per second
            `,
            price: 500,
            available: true,
            itemInfo: ["helperman", "autoclickers"]
        },

        sunglasses: {
            name: "sunglasses",
            desc: `
                shades so Sick<br>
                i<br>
                4C 6F 6E 67 4A 6F 68 6E<br>
                <br>
                gives you 37 points per second<br>
                <small>hehehehehehe 37</small>
            `,
            price: 1350,
            available: true,
            itemInfo: ["sunglasses", "autoclickers"]
        },

        sweatshopWorker: {
            name: "sweatshop worker",
            desc: `
                this one had made a successful escape of his workplace, however
                we've snatched him regardless. he keeps logging pleads for help,
                kinda annoying<br>
                <br>
                gives you 99 points per second
            `,
            price: 2500,
            available: true,
            itemInfo: ["sweatshopWorker", "autoclickers"]
        },

        magicalFedora: {
            name: "magical fedora",
            desc: `
                a piece of cranial attire so unbelieveably swagger it gives you points<br>
                <br>
                gives you 135 points per second
            `,
            price: 5000,
            available: true,
            itemInfo: ["magicalFedora", "autoclickers"]
        },

        warjammer: {
            name: "warjammer",
            desc: `
                jammer of war<br>
                it's splattered with ... jam<br>
                <br>
                gives you 245 points per second
            `,
            price: 15000,
            available: true,
            itemInfo: ["warjammer", "autoclickers"]
        },

        vrooman: {
            name: "vrooman",
            desc: `
                Mijn naam is vrooman<br>
                Ik vroom<br>
                <br>
                gives you 440 points per second
            `,
            price: 60000,
            available: true,
            itemInfo: ["vrooman", "autoclickers"]
        },

        dealer: {
            name: "the dealer",
            desc: `
                considering obtaining your points from a more... discreet source?<br>
                the dealer's your guy. provide <i>exact</i> change.<br>
                <br>
                gives you 870 points per second
            `,
            price: 300000,
            available: true,
            itemInfo: ["dealer", "autoclickers"]
        },

        elmaspet: {
            name: "elmaspet",
            desc: `
                "my esophagus is not placed correctly"<br>
                - moon tzu, the art of peace<br>
                <br>
                gives you 1969 points per second
            `,
            price: 1000000,
            available: true,
            itemInfo: ["elmaspet", "autoclickers"]
        },

        taxevaiden: {
            name: "Tax E. Vaiden",
            desc: `
                <span style="font-family: 'JetBrains Mono', monospace">
                    NC.Points.setPoints (2936);
                </span><br>
                <br>
                gives you 2936 points per second
            `,
            price: 2000000,
            available: true,
            itemInfo: ["taxevaiden", "autoclickers"]
        },

        masterClicker: {
            name: "master clicker",
            desc: `
                AoAT (Autoclicker of All Time)<br>
                <br>
                gives you 10,001 points per second
            `,
            price: 10000000,
            available: true,
            itemInfo: ["masterClicker", "autoclickers"]
        },

        timmy: {
            name: "timmy",
            desc: `
                remarkably, it has offered you mercy. but it is prudent to remember it is only<br>
                Slaughter.<br>
                <br>
                gives you 600,000 points per second
            `,
            price: 600000000,
            available: true,
            itemInfo: ["timmy", "autoclickers"]
        }
    }
}
NC.GameModel.constants.storeDefault = 
    structuredClone(NC.GameModel.store);

NC.GameModel.achievements = {
    // gambling
    firstGamble: {
        title: "99% of gamblers quit before winning big",
        desc: "Gamble for the first time.",
        unld: false
    },
    fifteenGamblesLost: {
        title: "You should stop... nah jk",
        desc: "Lose fifteen gambles.",
        unld: false
    },
    oneHundredGamblesLost: {
        title: "Crippling gambling addiction",
        desc: "Lose one hundred gambles.",
        unld: false
    },
    fiveHundredGamblesLost: {
        title: "Not winning big are you... you look so dumb LOL",
        desc: "Lose five hundred gambles.",
        unld: false
    },
    tenThousandPointsLostFromGambling: {
        title: "Ten thousand reasons to probably keep gambling",
        desc: "Lose ten thousand points gambling.",
        unld: false
    },
    fifteenGamblesWon: {
        title: "Keep gambling champ, nothing could possibly go wrong",
        desc: "Win fifteen gambles.",
        unld: false
    },
    oneHundredGamblesWon: {
        title: "Wait stop I hate you stop please I want my points back PLEASE",
        desc: "Win one hundred gambles.",
        unld: false
    },
    fiveHundredGamblesWon: {
        title: "I can't feed a family on negative numbers man",
        desc: "Win five hundred gambles.",
        unld: false
    },
    tenThousandPointsWonFromGambling: {
        title: "Stop gambling I want your points",
        desc: "Win ten thousand points gambling.",
        unld: false
    },
    extremeGambling: {
        title: "J-A-C-K-P-O-T-!",
        desc: "Win at extreme gambling.",
        unld: false
    },

    // steroids
    tenSteroids: {
        title: "Steroid abuse",
        desc: "Take steroids ten times.",
        unld: false
    },
    oneHundredSteroids: {
        title: "FEEL THE BURN",
        desc: "Take steroids one hundred times.",
        unld: false
    },
    oneThousandSteroids: {
        title: "Where's the burn",
        desc: "Take steroids one thousand times.",
        unld: false
    },

    // points spent
    oneThousandPointsSpent: {
        title: "Stop wasting money on food Sarah, I want my 8K-Ultra-High-Definiton YouTube back",
        desc: "Spend one thousand points.",
        unld: false
    },
    oneHundredThousandPointsSpent: {
        title: "I wasn't joking Sarah",
        desc: "Spend one hundred thousand points.",
        unld: false
    },
    oneMillionPointsSpent: {
        title: "Sarah where did you go",
        desc: "Spend one million points.",
        unld: false
    },

    // autoclickers
    helperman: {
        title: "Ignore the firearm",
        desc: "Purchase the Helper Man.",
        unld: false
    },
    sunglasses: {
        title: "Tint",
        desc: "Purchase the Sunglasses.",
        unld: false
    },
    sweatshopWorker: {
        title: "Top-notch ethics",
        desc: "Purchase the Sweatshop Worker.",
        unld: false
    },
    magicalFedora: {
        title: "Magical, m'lady",
        desc: "Purchase the Magical Fedora.",
        unld: false
    },
    warjammer: {
        title: "I SWEAR it's strawberry jam",
        desc: "Purchase the Warjammer.",
        unld: false
    },
    vrooman: {
        title: "He goes vroom vroom, and beep beep",
        desc: "Purchase the Vrooman.",
        unld: false
    },
    dealer: {
        title: "Let's make a deal, kid",
        desc: "Purchase the Dealer.",
        unld: false
    },
    elmaspet: {
        title: "Miller miner minor",
        desc: "Purchase elmaspet.",
        unld: false
    },
    taxevaiden: {
        title: "console.log(`what's up`)",
        desc: "Purchase taxevaiden.",
        unld: false
    },
    masterClicker: {
        title: "Master of clicks, and probably carpal tunnel",
        desc: "Purchase the Master Clicker.",
        unld: false
    },
    timmy: {
        title: "Scene not safe",
        desc: "Purchase Timmy.",
        unld: false
    },

    // aps (autoclicks per second)
    oneThousandAPS: {
        title: "Points coming to you from - not slaves, I swear",
        desc: "Reach one thousand autoclicks per second.",
        unld: false
    },
    oneHundredThousandAPS: {
        title: "EMPIRE!",
        desc: "Reach one hundred thousand autoclicks per second.",
        unld: false
    },

    fentanyl: {
        title: "Oh HELL no",
        desc: "Use ... Fentanyl.",
        unld: false
    },

    cursorCrack: {
        title: "Digital substance abuse",
        desc: "Use the Cursor Crack.",
        unld: false
    },

    achNaN: {
        title: "Oops",
        desc: "Your points have become NaN. Please report this issue in detail to the GitHub repo.",
        unld: false
    },

    achInfinity: {
        title: "End of the line buddy boy, ya ran out of bits",
        desc: 'Reach the 32-bit integer limit. ("Infinity")',
        unld: false
    }
}
NC.GameModel.constants.achievementsDefault = 
    structuredClone(NC.GameModel.achievements);