
// variables

    // main

        let pointsPerClick = 1; // default click power
        let clickCount = 0; // cps meter idle
        let cps = 0 // clicks per second

    // upgrade

        let steroidsPrice = 100;
        let gamblingPrice = 150;
        let stocksPrice = 750;
        let autoclickerPower = 0;


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
        localStorage.setItem("autoclickerPower", autoclickerPower);
        localStorage.setItem("stocksPrice", stocksPrice);
    }

    function loadPoints() {
        let savedPoints = localStorage.getItem('points');
        document.getElementById("points").innerText = savedPoints;
        
        pointsPerClick = Number(localStorage.getItem("pointsPerClick"));
        steroidsPrice = Number(localStorage.getItem("steroidsPrice"));
        capybaraExists = localStorage.getItem("capybara");
        autoclickerPower = Number(localStorage.getItem("autoclickerPower"));
        stocksPrice = Number(localStorage.getItem("stocksPrice"));

        updateClickPowerDisplay();
    }

    function resetPoints() {
        let confirmReset = confirm("are you sure?");
        if (confirmReset == true) {
            document.getElementById("points").innerText = 0;
            pointsPerClick = 1;
            steroidsPrice = 100;
            autoclickerPower = 0;
            gamblingPrice = 150;
            stocksPrice = 750;

            clearInterval(autoclickerInterval);
            autoclickerInterval = null;

            localStorage.clear();
            updateClickPowerDisplay();
        }
    }

// upgrade handling


    // steroids

        function injectSteroids() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= steroidsPrice) {
                document.getElementById("points").innerText = points - steroidsPrice // deduction
                pointsPerClick += 1;
                steroidsPrice *= 2;
                document.getElementById("steroidsPrice").innerText = `${steroidsPrice} points`;

                updateClickPowerDisplay();
            } else {
                alert("not enough points.")
            }
        }

        function updateClickPowerDisplay() {
            document.getElementById("clickPowerDisplay").innerText = `click power: ${pointsPerClick} points`;
        }

    // helper

        function helperman() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= 500) {
                document.getElementById("points").innerText = points - 500; // deduction
                autoclickerPower += 10;
                document.getElementById("monkeySlavery").style.backgroundColor = "lightgray";
                document.getElementById("monkeySlavery").onclick = "purchased.";
            } else {
                alert("not enough points.")
            }
        }

    // sweatshop worker

        function sweatshopWorker() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= 2500) {
                document.getElementById("points").innerText = points - 2500; // deduction
                autoclickerPower += 60;
                document.getElementById("sweatshopWorker").style.backgroundColor = "lightgray";
                document.getElementById("sweatshopWorker").onclick = "purchased.";
            } else {
                alert("not enough points.")
            }
        }

    // fedora
    
        function purchaseFedora() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= 5000) {
                document.getElementById("points").innerText = points - 5000; // deduction
                autoclickerPower += 100;
                document.getElementById("fedora").style.backgroundColor = "lightgray";
                document.getElementById("fedora").onclick = "purchased.";
            } else {
                alert("not enough points.")
            }
        }

    // stonks

        function stonks() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= stocksPrice) {
                points = Math.random() * (points * 5);
                stocksPrice *= 4;
                document.getElementById("stonksPrice").innerText = `${stocksPrice} points`;
                document.getElementById("points").innerText = Math.floor(points);
            } else {
                alert("not enough points.")
            }
        }

    // gambling

        function beIrresponsible() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= gamblingPrice) {
                points = Math.random() * (points * 2);
                gamblingPrice *= 4;
                document.getElementById("gamblingPrice").innerText = `${gamblingPrice} points`;
                document.getElementById("points").innerText = Math.floor(points);
            } else {
                alert("not enough points.")
            }

        }

    // masterclicker

        function initiateMasterClicker() {
            let points = Number(document.getElementById("points").innerText);
            if (points >= 10000000) {
                document.getElementById("points").innerText = points - 10000000; // deduction
                autoclickerPower += 100000;
                document.getElementById("masterclicker").style.backgroundColor = "lightgray";
                document.getElementById("masterclicker").onclick = "purchased.";
            } else {
                alert("not enough points.")
            }
        }

// autoclicker handling

    function autoClick() {
        autoclickerInterval = setInterval(() => {
            let points = Number(document.getElementById("points").innerText);
            document.getElementById("points").innerText = points + autoclickerPower;
        }, 1000)
    }

// cps meter handling

    setInterval(updateCPS, 1000); // 1 second loop

    function trackCPS() {
        clickCount++;
    }

    function updateCPS() {
        cps = clickCount;
        clickCount = 0;
        document.getElementById("cpsMeter").innerText = `CPS: ${cps} (clicks per second)`;
    }