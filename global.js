
// variables

let points = 0; 
let pointsPerClick = 1; // default click power
let steroidsPrice = 100; // initial cost
let clickCount = 0; // cps meter idle
let cps = 0 // clicks per second
let capybaraExists = 0;
let monkeySlaveryActive = false;
let gamblingPrice = 150;
let fedoraActive = false;
let monkeyInterval = null;
let fedoraInterval = null;


// point handling

function increasePoints() {
    let points = Number(document.getElementById("points").innerText);
    document.getElementById("points").innerText = points + pointsPerClick;

    trackCPS();
}

function savePoints() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("steroidsPrice", steroidsPrice);
    localStorage.setItem("capybara", capybaraExists);
    localStorage.setItem("slave", monkeySlaveryActive);
    localStorage.setItem("gamblingPrice", gamblingPrice);
    localStorage.setItem("fedora", fedoraActive);
}

function loadPoints() {
    let savedPoints = localStorage.getItem('points');
    document.getElementById("points").innerText = savedPoints;
    
    pointsPerClick = Number(localStorage.getItem("pointsPerClick"));
    steroidsPrice = Number(localStorage.getItem("steroidsPrice"));
    capybaraExists = localStorage.getItem("capybara");
    monkeySlaveryActive = localStorage.getItem("slave") === "true";
    gamblingPrice = Number(localStorage.getItem("gamblingPrice"));
    fedoraActive = localStorage.getItem("fedora") === "true";
    if (capybaraExists == 1) {
        revealCapybara();
    } else {
        hideCapybara();
    }

    updateClickPowerDisplay();
}

function resetPoints() {
    let confirmReset = confirm("are you sure?");
    if (confirmReset == true) {
        document.getElementById("points").innerText = 0;
        pointsPerClick = 1;
        steroidsPrice = 100;
        capybaraExists = 0;
        monkeySlaveryActive = false;
        clearInterval(monkeyInterval);
        monkeyInterval = null;
        gamblingPrice = 150;
        fedoraActive = false;
        clearInterval(fedoraInterval);
        fedoraInterval = null;

        updateClickPowerDisplay();
        hideCapybara();
    }
}

// upgrade handling


    // steroids

    function injectSteroids() {
        let points = Number(document.getElementById("points").innerText);
        if (points >= steroidsPrice) {
            document.getElementById("points").innerText = points - steroidsPrice // deduction
            pointsPerClick *= 2;
            steroidsPrice *= 2;
            document.getElementById("steroidsPrice").innerText = `${steroidsPrice} points`;

            updateClickPowerDisplay();
        } else {
            alert("not enough points.")
        }
}

    // capybara

    function revealCapybara() {
        capybaraExists = 1;
        document.getElementById("capybara").style.opacity = "0.5";
        document.getElementById("capybaraFren").style.backgroundColor = "lightgray";
        document.getElementById("capybaraFren").onclick = "purchased.";
    }

    function hideCapybara() {
        capybaraExists = 0;
        document.getElementById("capybara").style.opacity = "0";
        document.getElementById("capybaraFren").style.backgroundColor = "white";
        document.getElementById("capybaraFren").onclick = revealCapybara;
    }

    // slave

    function enslaveMonkey() {
        let points = Number(document.getElementById("points").innerText);
        if (points >= 500) {
            document.getElementById("points").innerText = points - 500; // deduction
            monkeySlaveryActive = true;
            startMonkeyWork();
        } else {
            alert("not enough points.")
        }
    }

    function startMonkeyWork() {
        if (!monkeySlaveryActive) return;
        document.getElementById("monkeySlavery").style.backgroundColor = "lightgray";
        document.getElementById("monkeySlavery").onclick = "purchased.";

        monkeyInterval = setInterval(() => {
            let points = Number(document.getElementById("points").innerText);
            document.getElementById("points").innerText = points + 1;
        }, 2000)
    }

    // fedora
    
    function purchaseFedora() {
        let points = Number(document.getElementById("points").innerText);
        if (points >= 5000) {
            document.getElementById("points").innerText = points - 5000; // deduction
            fedoraActive = true;
            makeFedoraMagical();
        }
    }

    function makeFedoraMagical() {
        if (!fedoraActive) return;
        document.getElementById("fedora").style.backgroundColor = "lightgray";
        document.getElementById("fedora").onclick = "purchased";
        
        fedoraInterval = setInterval(() => {
            let points = Number(document.getElementById("points").innerText);
            document.getElementById("points").innerText = points + 2;
        }, 1000)
    }

    // gambling

    function beIrresponsible() {
        let points = Number(document.getElementById("points").innerText);
        if (points >= gamblingPrice) {
            points = Math.random() * (points * 4);
            gamblingPrice *= 4;
            document.getElementById("gamblingPrice").innerText = `${gamblingPrice} points`;
            document.getElementById("points").innerText = Math.floor(points);
        } else {
            alert("not enough points.")
        }

    }

// cps meter handling

function trackCPS() {
    clickCount++;
}

function updateCPS() {
    cps = clickCount;
    clickCount = 0;
    document.getElementById("cpsMeter").innerText = `CPS: ${cps} (clicks per second)`;
}

setInterval(updateCPS, 1000); // 1 second loop

function updateClickPowerDisplay() {
    document.getElementById("clickPowerDisplay").innerText = `click power: ${pointsPerClick} points`;
}