// point control
NC.Points.setPoints = function(newPoints) {
    const pointsElem = document.getElementById("main_points");
    NC.Player.gameState.points = newPoints;
    pointsElem.innerText = NC.Player.gameState.points;
    NC.Multimedia.animateElement("main_points", "pop");
}
NC.Points.increasePoints = function() {
    NC.Multimedia.playSfxRandomPitch("clickSound");
    NC.Player.gameState.points += NC.Player.gameState.pointsPerClick;
    NC.Points.setPoints(NC.Player.gameState.points);
    NC.Points.trackCPS();
}
NC.Points.deductPoints = function(x) {
    NC.Player.gameState.points -= x;
    NC.Player.gameState.pointsSpent += x;
    NC.Points.setPoints(NC.Player.gameState.points);
}

// cps
NC.Points.trackCPS = function() { NC.Bootstrap.gameStateLive.clickCount++; }
NC.Points.updateCPS = function() {
    NC.Bootstrap.gameStateLive.cps = NC.Bootstrap.gameStateLive.clickCount;
    NC.Bootstrap.gameStateLive.clickCount = 0;
    document.getElementById("stat_cpsMeter").innerHTML = `${NC.Bootstrap.gameStateLive.cps}`;
}

NC.constantsFunction("Points");