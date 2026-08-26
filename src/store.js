NC.Store.affordable = function(price) {
    return price <= NC.GameModel.core.points;
}

NC.Store.setAvailability = function(storeObject, available) {
    storeObject.available = available;
    return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemAvailabilityChanged, {
        itemInfo: storeObject.itemInfo
    });
}

NC.Store.purchaseAutoclicker = function({
        key, 
        gain, 
        sound = null
    }) {
    const storeObject = NC.GameModel.store.autoclickers[key];
    if (!NC.Store.affordable(storeObject.price)) {
        return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
            itemInfo: storeObject.itemInfo
        });
    } else {
        NC.Points.spendPoints(storeObject.price);
        NC.Store.setAvailability(storeObject, false);
        if (sound !== null) { NC.Audio.playSfx(sound); }
        NC.GameModel.core.autoclickerPower += gain;
        NC.Events.Signals.emit(NC.Events.events.gameModel.autoclickerPowerUpdated);
        return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
            itemInfo: storeObject.itemInfo
        });
    }
}

NC.Store.general = {
    steroids() {
        const storeObject = NC.GameModel.store.general.steroids;
        if (!NC.Store.affordable(storeObject.price)) {
            return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
                itemInfo: storeObject.itemInfo
            });
        } else {
            NC.Points.spendPoints(storeObject.price);
            NC.GameModel.core.clickPower += 1;
            NC.Events.Signals.emit(NC.Events.events.gameModel.clickPowerUpdated);
            storeObject.price *= 2;
            NC.Audio.playSfx("syringe");
            return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
                itemInfo: storeObject.itemInfo
            });
        }
    },

    fentanyl() {
        const storeObject = NC.GameModel.store.general.fentanyl;
        if (!NC.Store.affordable(storeObject.price)) {
            return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
                itemInfo: storeObject.itemInfo
            });
        } else {
            NC.Points.spendPoints(storeObject.price);
            NC.GameModel.core.clickPower *= 2;
            NC.Events.Signals.emit(NC.Events.events.gameModel.clickPowerUpdated);
            storeObject.price *= 4;
            NC.Audio.playSfx("pillSpill");
            return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
                itemInfo: storeObject.itemInfo
            });
        }
    },

    gambling() {
        const storeObject = NC.GameModel.store.general.gambling;
        if (!NC.Store.affordable(storeObject.price)) {
            return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
                itemInfo: storeObject.itemInfo
            });
        } else {
            const loseChance = 0.60;
            if (Math.random() < loseChance) {
                const loss = Math.floor(Math.random() * NC.GameModel.core.points);
                NC.Points.deductPoints(loss);
                NC.Render.screenBoxNotification(
                    `Unlucky! You've gambled away ${loss} points.`
                );
                NC.Audio.playSfx("mujaja");
                NC.GameModel.core.gamblesLost++;
                NC.GameModel.core.gamblingPointsLost += loss;
                NC.Events.Signals.emit(NC.Events.events.gameModel.gambleLost, {
                    pointsLost: loss
                });
            } else {
                const win = Math.floor(Math.random() * (NC.GameModel.core.points * 4));
                NC.Points.setPoints(NC.GameModel.core.points + win);
                NC.Render.screenBoxNotification(
                    `Lucky you! You've won ${win} points!`
                );
                NC.Audio.playSfx("dice");
                NC.GameModel.core.gamblesWon++;
                NC.GameModel.core.gamblingPointsWon += win;
                NC.Events.Signals.emit(NC.Events.events.gameModel.gambleWon, {
                    pointsWon: win
                });
            }
            storeObject.price *= 9;
            return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
                itemInfo: storeObject.itemInfo
            });
        }
    },

    extremeGambling() {
        const storeObject = NC.GameModel.store.general.extremeGambling;
        if (!NC.Store.affordable(storeObject.price)) {
            return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
                itemInfo: storeObject.itemInfo
            });
        } else {
            const loseChance = 0.95;
            if (Math.random() < loseChance) {
                const loss = Math.floor(Math.random() * NC.GameModel.core.points);
                NC.Points.deductPoints(loss);
                NC.Render.screenBoxNotification(
                    `Were you expecting much..? You've gambled away ${loss} points.`
                );
                NC.Audio.playSfx("mujaja");
                NC.GameModel.core.gamblesLost++;
                NC.GameModel.core.gamblingPointsLost += loss;
                NC.Events.Signals.emit(NC.Events.events.gameModel.gambleLost, {
                    pointsLost: loss
                });
            } else {
                const win = Math.floor(Math.random() * (NC.GameModel.core.points * 20));
                NC.Points.setPoints(NC.GameModel.core.points + win);
                NC.Render.screenBoxNotification(
                    `Woah, what luck! You've won ${win} points!`
                );
                NC.Audio.playSfx("dice");
                NC.GameModel.core.gamblesWon++;
                NC.GameModel.core.gamblingPointsWon += win;
                if (NC.GameModel.core.extremeGamblingWon === false) { NC.GameModel.core.extremeGamblingWon = true; }
                NC.Events.Signals.emit(NC.Events.events.gameModel.gambleWon, {
                    pointsWon: win
                });
            }
            storeObject.price *= 3;
            return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
                itemInfo: storeObject.itemInfo
            });
        }
    },

    cursorCrack() {
        const storeObject = NC.GameModel.store.general.cursorCrack;
        if (!NC.Store.affordable(storeObject.price)) {
            return NC.Events.Signals.emit(NC.Events.events.gameModel.insufficientPoints, {
                itemInfo: storeObject.itemInfo
            });
        } else {
            NC.Points.spendPoints(storeObject.price);
            NC.Store.setAvailability(storeObject, false);
            const startClickPower = NC.GameModel.core.clickPower;
            NC.Render.cursorCrackEffect("add");
            const ceiling = NC.GameModel.core.clickPower * 7;
            NC.GameModel.core.clickPower *= Math.floor(Math.random() * ceiling);
            NC.Events.Signals.emit(NC.Events.events.gameModel.clickPowerUpdated);
            NC.Audio.playSfx("feelingFunny");
            storeObject.price *= 5;
            setTimeout(() => {
                NC.Render.cursorCrackEffect("remove");
                NC.GameModel.core.clickPower = startClickPower;
                NC.Events.Signals.emit(NC.Events.events.gameModel.clickPowerUpdated);
                NC.Store.setAvailability(storeObject, true);
            }, 5000);
            return NC.Events.Signals.emit(NC.Events.events.gameModel.storeItemPurchased, {
                itemInfo: storeObject.itemInfo
            });
        }
    }
};

NC.Store.autoclickers = {
    helperman() {
        NC.Store.purchaseAutoclicker({
            key: "helperman",
            gain: 15,
            sound: "gun-cock"
        });
    },
    sunglasses() {
        NC.Store.purchaseAutoclicker({
            key: "sunglasses",
            gain: 37,
            sound: "ohsnap"
        });
    },
    sweatshopWorker() {
        NC.Store.purchaseAutoclicker({
            key: "sweatshopWorker",
            gain: 99,
            sound: "sewing"
        });
    },
    magicalFedora() {
        NC.Store.purchaseAutoclicker({
            key: "magicalFedora",
            gain: 135,
            sound: "magick"
        });
    },
    warjammer() {
        NC.Store.purchaseAutoclicker({
            key: "warjammer",
            gain: 245,
            sound: "knockou"
        });
    },
    vrooman() {
        NC.Store.purchaseAutoclicker({
            key: "vrooman",
            gain: 440,
            sound: "freepbeep"
        });
    },
    dealer() {
        NC.Store.purchaseAutoclicker({
            key: "dealer",
            gain: 870,
            sound: "velcro"
        });
    },
    elmaspet() {
        NC.Store.purchaseAutoclicker({
            key: "elmaspet",
            gain: 1969,
            sound: "boom"
        });
    },
    taxevaiden() {
        NC.Store.purchaseAutoclicker({
            key: "taxevaiden",
            gain: 2936,
            sound: "keyboardy"
        });
    },
    masterClicker() {
        NC.Store.purchaseAutoclicker({
            key: "masterClicker",
            gain: 10001,
            sound: "powenup"
        });
    },
    timmy() {
        NC.Store.purchaseAutoclicker({
            key: "timmy",
            gain: 600000,
            sound: "whathaveyoudone"
        });
    }
}