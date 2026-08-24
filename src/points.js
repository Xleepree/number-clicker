NC.Points.setPoints = function(newPoints) {
    NC.GameModel.core.points = newPoints;
    NC.Events.Signals.emit(NC.Events.events.gameModel.pointsChanged);
}

NC.Points.deductPoints = function(points) {
    NC.Points.setPoints(
        NC.GameModel.core.points - points
    );
}

NC.Points.spendPoints = function(points) {
    NC.Points.deductPoints(points);
    NC.GameModel.core.pointsSpent += points;
    NC.Events.Signals.emit(NC.Events.events.gameModel.pointsSpent);
}

NC.Points.incrementPoints = function() {
    NC.Points.setPoints(
        NC.GameModel.core.points + NC.GameModel.core.clickPower
    );
    NC.Events.Signals.emit(NC.Events.events.renderRegistry.pointsBoxClicked);
}

NC.Points.autoclick = function() {
    if (NC.GameModel.core.autoclickerPower === 0) { return; }
    NC.Points.setPoints(
        NC.GameModel.core.points + NC.GameModel.core.autoclickerPower
    );
    NC.Events.Signals.emit(NC.Events.events.gameModel.autoclicked);
}