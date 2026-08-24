NC.Achs.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.gameModel.storeItemPurchased, async () => {
        NC.Achs.check();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.pointsChanged, async () => {
        NC.Achs.check();
    });
}

NC.Achs.achievement = function(ach) {
    if (!ach) {
        return NC.Logs.internalError(`Achievement "${ach}" does not exist`);
    }
    if (ach.unld) { return; }
    ach.unld = true;
    return NC.Events.Signals.emit(NC.Events.events.gameModel.achievementUnlocked, {
        ach: ach
    });
}

NC.Achs.check = function() {
    if (NC.GameModel.core.gamblesWon + NC.GameModel.core.gamblesLost == 1) {
        NC.Achs.achievement(NC.GameModel.achievements.firstGamble);
    }
    if (NC.GameModel.core.gamblesLost == 15) {
        NC.Achs.achievement(NC.GameModel.achievements.fifteenGamblesLost);
    }
    if (NC.GameModel.core.gamblesLost == 100) {
        NC.Achs.achievement(NC.GameModel.achievements.oneHundredGamblesLost);
    }
    if (NC.GameModel.core.gamblesLost == 500) {
        NC.Achs.achievement(NC.GameModel.achievements.fiveHundredGamblesLost);
    }
    if (NC.GameModel.core.gamblingPointsLost == 10000) {
        NC.Achs.achievement(NC.GameModel.achievements.tenThousandPointsLostFromGambling);
    }
    if (NC.GameModel.core.gamblesWon == 15) {
        NC.Achs.achievement(NC.GameModel.achievements.fifteenGamblesWon);
    }
    if (NC.GameModel.core.extremeGamblingWon == true) {
        NC.Achs.achievement(NC.GameModel.achievements.extremeGambling);
    }
    if (NC.GameModel.core.steroidsUsed == 10) {
        NC.Achs.achievement(NC.GameModel.achievements.tenSteroids);
    }
    if (NC.GameModel.core.steroidsUsed == 100) {
        NC.Achs.achievement(NC.GameModel.achievements.oneHundredSteroids);
    }
    if (NC.GameModel.core.steroidsUsed == 1000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneThousandSteroids);
    }
    if (NC.GameModel.core.pointsSpent == 1000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneThousandPointsSpent);
    }
    if (NC.GameModel.core.pointsSpent == 100000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneHundredThousandPointsSpent);
    }
    if (NC.GameModel.core.pointsSpent == 1000000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneMillionPointsSpent);
    }
    if (NC.GameModel.store.autoclickers.helperman.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.helperman);
    }
    if (NC.GameModel.store.autoclickers.sunglasses.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.sunglasses);
    }
    if (NC.GameModel.store.autoclickers.sweatshopWorker.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.sweatshopWorker);
    }
    if (NC.GameModel.store.autoclickers.magicalFedora.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.magicalFedora);
    }
    if (NC.GameModel.store.autoclickers.warjammer.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.warjammer);
    }
    if (NC.GameModel.store.autoclickers.vrooman.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.vrooman);
    }
    if (NC.GameModel.store.autoclickers.dealer.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.dealer);
    }
    if (NC.GameModel.store.autoclickers.elmaspet.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.elmaspet);
    }
    if (NC.GameModel.store.autoclickers.taxevaiden.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.taxevaiden);
    }
    if (NC.GameModel.store.autoclickers.masterClicker.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.masterClicker);
    }
    if (NC.GameModel.store.autoclickers.timmy.available == false) {
        NC.Achs.achievement(NC.GameModel.achievements.timmy);
    }
    if (NC.GameModel.core.autoclickerPower == 1000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneThousandAPS);
    }
    if (NC.GameModel.core.autoclickerPower == 100000) {
        NC.Achs.achievement(NC.GameModel.achievements.oneHundredThousandAPS);
    }
    if (NC.GameModel.core.fentanylUsed == true) {
        NC.Achs.achievement(NC.GameModel.achievements.fentanyl);
    }
    if (NC.GameModel.core.cursorCrackUsed == true) {
        NC.Achs.achievement(NC.GameModel.achievements.cursorCrackUsed);
    }
    if (isNaN(NC.GameModel.core.points)) {
        NC.Achs.achievement(NC.GameModel.achievements.achNaN);
    }
    if (!isFinite(NC.GameModel.core.points)) {
        NC.Achs.achievement(NC.GameModel.achievements.achInfinity);
    }
}