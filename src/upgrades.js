NC.Upgrades.insufficientPoints = function() {
    NC.Ui.alertC("not enough points.");
    NC.Multimedia.playSfx("badAlertSound");
}

NC.Upgrades.purchaseAutoclicker = function({ id, cost, powerGain, sound = null }) {
    if (NC.Player.gameState.points < cost) { return NC.Upgrades.insufficientPoints(); }
    NC.Points.deductPoints(cost);
    NC.Player.gameState.autoclickerPower += powerGain;
    const item = document.getElementById(`stritem_${id}`);
    if (item) {
        item.style.backgroundColor = "var(--upgrade-active)";
        item.classList.add("purchased");
        item.onclick = null;
    } else {
        return console.error(`Store item "${item}" does not exist`);
    }
    NC.Upgrades.autoClick();
    if (sound) {
        NC.Multimedia.playSfx(sound);
    }
}

// autoclicker function
NC.Upgrades.autoClick = function() {
    if (NC.Player.gameState.autoclickerPower <= 0) { 
        return; 
    } else {
        setTimeout(NC.Multimedia.playSfx("clangSound", 0.2), 1000);
        NC.Player.gameState.points += NC.Player.gameState.autoclickerPower;
        NC.Points.setPoints(NC.Player.gameState.points);
    }
}

// steroids
NC.Upgrades.injectSteroids = function() {
    if (NC.Player.gameState.points >= NC.Player.gameState.steroidsPrice) {
        NC.Points.deductPoints(NC.Player.gameState.steroidsPrice);
        NC.Points.setPoints(NC.Player.gameState.points);
        NC.Player.gameState.pointsPerClick += 1;
        NC.Player.gameState.steroidsPrice *= 2;
        NC.Multimedia.playSfx("syringe");
        NC.Player.gameState.steroidsUsed++;
    } else { return NC.Upgrades.insufficientPoints(); }
}

// fentanyl
NC.Upgrades.uhOhFent = function() {
    if (NC.Player.gameState.points >= NC.Player.gameState.fentanylPrice) {
        NC.Points.deductPoints(NC.Player.gameState.fentanylPrice);
        NC.Points.setPoints(NC.Player.gameState.points);
        NC.Player.gameState.pointsPerClick *= 2;
        NC.Player.gameState.fentanylPrice *= 4;
        NC.Multimedia.playSfx("pillSpill");
        if (NC.Player.gameState.fentanylUsed == false) { NC.Player.gameState.fentanylUsed = true; }
    } else { return NC.Upgrades.insufficientPoints(); }
}

// cursor crack
NC.Upgrades.mmmCrack = function() {
    if (NC.Player.gameState.points >= NC.Player.gameState.cursorCrackPrice) {
        NC.Points.deductPoints(NC.Player.gameState.cursorCrackPrice);
        NC.Points.setPoints(NC.Player.gameState.points);

        const normalPointsPerClick = NC.Player.gameState.pointsPerClick;

        let bodyEffects = document.createElement("div");
        bodyEffects.id = "main_cursorCrackEffectsOverlay";
        document.body.appendChild(bodyEffects);
        bodyEffects.style.opacity = "1";

        const ceiling = NC.Player.gameState.pointsPerClick * 7;
        NC.Player.gameState.pointsPerClick += Math.floor(
        NC.Player.gameState.pointsPerClick + Math.random() * ceiling);
        NC.Player.gameState.cursorCrackPrice *= 3;
        NC.Multimedia.playSfx("feelingFunny");

        setTimeout(() => {
            bodyEffects.style.opacity = "0";
            setTimeout(() => { bodyEffects.remove(); }, 500);
            NC.Player.gameState.pointsPerClick = normalPointsPerClick;
        }, 5000);
    } else { return NC.Upgrades.insufficientPoints(); }
}

// helperman 
NC.Upgrades.helperman = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "helperman",
        cost: 500,
        powerGain: 15,
        sound: "gunCock",
    });
    if (NC.Player.gameState.points >= 500) {
        document.getElementById("stritem_helpermanImg").src = "images/upgrades/helperman-danger.png";
    }
}

// sunglasses
NC.Upgrades.sunglasses = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "sunglasses",
        cost: 1350,
        powerGain: 37,
        sound: "ohSnap",
    });
}

// sweatshop worker
NC.Upgrades.sweatshopWorker = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "sweatshopWorker",
        cost: 2500,
        powerGain: 99,
        sound: "sewing",
    });
}

// fedora
NC.Upgrades.purchaseFedora = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "fedora",
        cost: 5000,
        powerGain: 135,
        sound: "magick",
    });
}

// warjammer
NC.Upgrades.warjammer = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "warjammer",
        cost: 15000,
        powerGain: 245,
        sound: "knockou",
    });
}

// vrooman
NC.Upgrades.vroomingMan = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "vrooman",
        cost: 60000,
        powerGain: 440,
        sound: "freepBeep",
    });
}

// dealer
NC.Upgrades.dealer = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "dealer",
        cost: 300000,
        powerGain: 870,
        sound: "velcro",
    });
}

// elmaspet
NC.Upgrades.elmaspet = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "elmaspet",
        cost: 1000000,
        powerGain: 1969,
        sound: "boom",
    });
}

// taxevaiden
NC.Upgrades.tacksEVadion = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "taxevaiden",
        cost: 2000000,
        powerGain: 2936,
        sound: "keyboardy",
    });
}

// masterclicker
NC.Upgrades.initiateMasterClicker = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "masterClicker",
        cost: 10000000,
        powerGain: 10001,
        sound: "powenup",
    });
}

// timmy
NC.Upgrades.timmy = function() {
    NC.Upgrades.purchaseAutoclicker({
        id: "timmy",
        cost: 600000000,
        powerGain: 600000,
        sound: "whatHaveYouDone",
    });
}

// gambling
NC.Upgrades.beIrresponsible = function() {
    const loseChance = 0.60;
    if (NC.Player.gameState.points >= NC.Player.gameState.gamblingPrice) {
        if (Math.random() < loseChance) {
            // lose
            const loss = Math.floor(Math.random() * NC.Player.gameState.points);
            NC.Player.gameState.points -= loss;
            NC.Points.setPoints(NC.Player.gameState.points);
            NC.Ui.alertC(`unlucky! lost ${loss} points`);
            NC.Player.gameState.gamblesLost++;
            NC.Player.gameState.gamblingPointsLost += loss;
            NC.Multimedia.playSfx("mujajaLaugh");
        } else {
            // win
            const win = Math.floor(Math.random() * (NC.Player.gameState.points * 4));
            NC.Player.gameState.points += win;
            NC.Points.setPoints(NC.Player.gameState.points);
            NC.Ui.alertC(`lucky you! won ${win} points`);
            NC.Player.gameState.gamblesWon++;
            NC.Player.gameState.gamblingPointsWon += win;
            NC.Multimedia.playSfx("diceThrow");
        }
        NC.Player.gameState.gamblingPrice *= 9;
    } else { return NC.Upgrades.insufficientPoints(); }
}

// extreme gambling
NC.Upgrades.beMoreIrresponsible = function() {
    const loseChance = 0.95;
    if (NC.Player.gameState.points >= NC.Player.gameState.extremeGamblingPrice) {
        if (Math.random() < loseChance) {
            // lose
            const loss = Math.floor(Math.random() * NC.Player.gameState.points);
            NC.Player.gameState.points -= loss;
            NC.Points.setPoints(NC.Player.gameState.points);
            NC.Ui.alertC(`unlucky! lost ${loss} points`);
            NC.Player.gameState.gamblesLost++;
            NC.Player.gameState.gamblingPointsLost += loss;
            NC.Multimedia.playSfx("mujajaLaugh");
        } else {
            // win
            const win = Math.floor(Math.random() * (NC.Player.gameState.points * 20));
            NC.Player.gameState.points += win;
            NC.Points.setPoints(NC.Player.gameState.points);
            NC.Ui.alertC(`lucky you! won ${win} points`);
            NC.Player.gameState.gamblesWon++;
            NC.Player.gameState.gamblingPointsWon += win;
            if (NC.Player.gameState.extremeGamblingWon == false) { NC.Player.gameState.extremeGamblingWon = true; }
            NC.Multimedia.playSfx("diceThrow");
        }
        NC.Player.gameState.extremeGamblingPrice *= 3;
    } else { return NC.Upgrades.insufficientPoints(); }
}

NC.constantsFunction("Upgrades");
