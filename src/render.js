NC.Render.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.gameModel.pointsChanged, async () => {
        NC.Render.points();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.cpsUpdated, async () => {
        NC.Render.cps();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.clickPowerUpdated, async () => {
        NC.Render.clickPower();
        NC.Render.statClickPower();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.autoclickerPowerUpdated, async() => {
        NC.Render.autoclickerPower();
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.gameMenuLoaded, async ({ category }) => {
        NC.Render.gameMenuNavigation(category);
        if (category == "options") { NC.Render.sfxVolume(); }
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.storeMenuLoaded, async () => {
        NC.Render.storeMenuNavigation();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.gameMenuCategoryChanged, async () => {
        NC.Render.gameMenu(NC.AppModel.runtime.gameMenuCategoryLoaded);
    });
    NC.Events.Signals.on(NC.Events.events.appModel.storeMenuCategoryChanged, async () => {
        NC.Render.storeMenu();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.gameThemeChanged, async () => {
        NC.Render.theme();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.fullscreenChanged, async () => {
        NC.Render.fullscreen();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.sfxVolumeChanged, async () => {
        NC.Render.sfxVolume();
    });
    NC.Events.Signals.on(NC.Events.events.appModel.autosaveToggled, async () => {
        NC.Render.autosave();
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.autosaveButtonRejected, async () => {
        NC.Render.buttonReject(NC.RenderRegistry.elements.button.autosave);
    });
    NC.Events.Signals.on(NC.Events.events.storage.saveLoaded, async () => {
        NC.Render.flushSavePertaining();
    });
    NC.Events.Signals.on(NC.Events.events.storage.saveReset, async () => {
        NC.Render.flushSavePertaining();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.gameModelReassigned, async () => {
        NC.Render.flushSavePertaining();
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.saveSlotsConfigButtonRejected, async ({ slot, action }) => {
        NC.Render.saveSlotsConfigButtonRejected(slot, action);
    });
    NC.Events.Signals.on(NC.Events.events.renderRegistry.storeItemRejected, async ({ item }) => {
        NC.Render.storeItemRejected(item);
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.storeItemPurchased, async ({ itemInfo }) => {
        NC.Render.flushStoreItem(itemInfo);
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.gambleLost, async () => {
        NC.Render.gamblingStats();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.gambleWon, async () => {
        NC.Render.gamblingStats();
    });
    NC.Events.Signals.on(NC.Events.events.gameModel.pointsSpent, async () => {
        NC.Render.pointsSpent();
    });
}

NC.Render.getId = function(element) {
    const id = document.getElementById(
        element.id
    );
    return id;
}

NC.Render.animate = function(element, animation) {
    const node = NC.Render.getId(element);
    const animationClass = `animclass-${animation}`;
    node.classList.remove(animationClass);
    void node.offsetWidth;
    node.classList.add(animationClass);
}

NC.Render.flushSavePertaining = function() {
    NC.Render.saveSlot();
    NC.Render.points();
    NC.Render.clickPower();
    NC.Render.achievements();
    NC.Render.flushAllStats();
    NC.Render.storeMenu(NC.AppModel.runtime.storeMenuCategoryLoaded);
}

NC.Render.points = function() {
    const points = NC.GameModel.core.points;
    NC.Render.animate(NC.RenderRegistry.elements.textfield.points, "pop");
    for (const element of Object.values(NC.RenderRegistry.elementGroups.points)) {
        if (!NC.Render.getId(element)) { return; }
        NC.Render.getId(element).innerText = points;
    }
}

NC.Render.version = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.countertopLineVersion);
    if (!node) { return; }
    node.innerText = NC.version;
}

NC.Render.clickPower = function() {
    const clickPower = NC.GameModel.core.clickPower;
    let clickPowerString = '';
    clickPower == 1 ? clickPowerString = `1 pt.` : clickPowerString = `${clickPower} pts.`;
    for (const element of Object.values(NC.RenderRegistry.elementGroups.clickPower)) {
        if (!NC.Render.getId(element)) { return; }
        NC.Render.getId(element).innerText = clickPower;
    }
}

NC.Render.saveSlot = function() {
    const slot = NC.AppModel.core.saveSlot;
    const countertopNode = NC.Render.getId(NC.RenderRegistry.elements.textfield.countertopLineSlot);
    if (!countertopNode) { return; }
    slot === null ? countertopNode.innerText = "0" : countertopNode.innerText = slot;
}

NC.Render.cps = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.cps);
    if (!node) { return; }
    node.innerText = NC.GameModel.runtime.cps;
}

NC.Render.gameMenu = function(category) { 
    {
        const removalNode = NC.Render.getId(NC.RenderRegistry.elements.page.gameMenuContent);
        const parent = NC.Render.getId(NC.RenderRegistry.elements.page.gameMenu);
        let replaceElem = document.createElement("div");
        removalNode.remove();
        replaceElem.id = NC.RenderRegistry.elements.page.gameMenuContent.id;
        parent.appendChild(replaceElem);
    }
    const node = NC.Render.getId(NC.RenderRegistry.elements.page.gameMenuContent);
    switch (category) {
        case "stats": {
            node.innerHTML = NC.HTML.constants.gameMenuStats;
            NC.Render.flushAllStats();
            break;
        }
        case "achievements": {
            node.innerHTML = NC.HTML.constants.gameMenuAchievements;
            NC.Render.achievements();
            break;
        }
        case "options": {
            node.innerHTML = NC.HTML.constants.gameMenuOptions;
            NC.Render.autosave();
            break;
        }
        default: {
            return NC.Logs.internalError(
                `Category "${category}" to load into the game menu does not exist`
            );
            break;
        }
    }
    NC.Events.Signals.emit(NC.Events.events.renderRegistry.gameMenuLoaded, { category: category });
}

NC.Render.storeMenu = function() {
    {
        const removalNode = NC.Render.getId(NC.RenderRegistry.elements.page.storeMenuContent);
        const parent = NC.Render.getId(NC.RenderRegistry.elements.page.storeMenu);
        let replaceElem = document.createElement("div");
        removalNode.remove();
        replaceElem.id = NC.RenderRegistry.elements.page.storeMenuContent.id;
        parent.appendChild(replaceElem);
    }
    switch (NC.AppModel.runtime.storeMenuCategoryLoaded) {
        case "general": {
            for (const [key, values] of Object.entries(NC.GameModel.store.general)) {
                let elem = document.createElement("div");
                elem.id = NC.RenderRegistry.elements.button[`${key}Store`].id;
                elem.innerHTML = `
                    <img src="images/store/${key}.png">
                    <h1>${values.name}</h1>
                    <p>${values.desc}</p>
                    <p><small><span id="textfield_${key}Price">${values.price}</span> pts.</small></p>
                `;
                if (values.available === false) {
                    elem.classList.add("store-menu-container-unavailable");
                }
                elem.addEventListener("click", () => {
                    if (!NC.Store.general[key]) { return; }
                    NC.Store.general[key]();
                });
                NC.Render.getId(NC.RenderRegistry.elements.page.storeMenuContent).appendChild(elem);
            }
            break;
        }
        case "autoclickers": {
            for (const [key, values] of Object.entries(NC.GameModel.store.autoclickers)) {
                let elem = document.createElement("div");
                elem.id = NC.RenderRegistry.elements.button[`${key}Store`].id;
                elem.innerHTML = `
                    <img src="images/store/${key}.png">
                    <h1>${values.name}</h1>
                    <p>${values.desc}</p>
                    <p><small><span id="textfield_${key}Price">${values.price}</span> pts.</small></p>
                `;
                if (values.available === false) {
                    elem.classList.add("store-menu-container-unavailable");
                }
                elem.addEventListener("click", () => {
                    if (!NC.Store.autoclickers[key]) { return; }
                    NC.Store.autoclickers[key]();
                });
                NC.Render.getId(NC.RenderRegistry.elements.page.storeMenuContent).appendChild(elem);
            }
            break;
        }
        default: {
            return NC.Logs.internalError(
                `Category "${NC.AppModel.runtime.storeMenuCategoryLoaded}" to load into the store menu does not exist`
            );
            break;
        }
    }
    return NC.Events.Signals.emit(NC.Events.events.renderRegistry.storeMenuLoaded);
}  

NC.Render.achievements = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.page.gameMenuContent);
    if (NC.AppModel.runtime.gameMenuCategoryLoaded != "achievements") { return; }
    for (ach of Object.values(NC.GameModel.achievements)) {
        let container = document.createElement("div");
        container.classList.add("achievements-menu-container");
        let title = document.createElement("h2");
        title.innerText = ach.title;
        let desc = document.createElement("p");
        desc.innerText = ach.desc;
        if (!ach.unld) { container.classList.add("achievements-menu-container-locked"); }
        container.appendChild(title);
        container.appendChild(desc);
        node.appendChild(container);
    }
}

NC.Render.statPoints = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.statPoints);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.points;
}

NC.Render.statClickPower = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.statClickPower);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.clickPower;
}

NC.Render.autoclickerPower = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.autoclickerPower);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.autoclickerPower;
}

NC.Render.gamblesWon = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblesWon);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.gamblesWon;
}

NC.Render.gamblingPointsWon = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblingPointsWon);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.gamblingPointsWon;
}

NC.Render.pointsSpent = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.pointsSpent);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.pointsSpent;
}

NC.Render.gamblesLost = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblesLost);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.gamblesLost;
}

NC.Render.gamblingPointsLost = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblingPointsLost);
    if (!node) { return; }
    node.innerText = NC.GameModel.core.gamblingPointsLost;
}

NC.Render.flushAllStats = function() {
    NC.Render.statPoints();
    NC.Render.statClickPower();
    NC.Render.autoclickerPower();
    NC.Render.gamblesWon();
    NC.Render.gamblingPointsWon();
    NC.Render.pointsSpent();
    NC.Render.gamblesLost();
    NC.Render.gamblingPointsLost();
}

NC.Render.gameMenuNavigation = function(category) {
    const nodes = {
        nodeStats: NC.Render.getId(NC.RenderRegistry.elements.button.gameMenuNavigationStats),
        nodeAchievements: NC.Render.getId(NC.RenderRegistry.elements.button.gameMenuNavigationAchs),
        nodeOptions: NC.Render.getId(NC.RenderRegistry.elements.button.gameMenuNavigationOptions)
    }
    for (node of Object.values(nodes)) { node.classList.remove("menu-navigation-button-focused"); }
    switch (category) {
        case "stats": { nodes.nodeStats.classList.add("menu-navigation-button-focused"); break; }
        case "achievements": { nodes.nodeAchievements.classList.add("menu-navigation-button-focused"); break; }
        case "options": { nodes.nodeOptions.classList.add("menu-navigation-button-focused"); break; }
        default: {
            return NC.Logs.internalError(
                `Category "${category}" to highlight game menu button of does not exist`
            );
            break;
        }
    }
}

NC.Render.storeMenuNavigation = function() {
    const nodes = {
        nodeGeneral: NC.Render.getId(NC.RenderRegistry.elements.button.storeMenuNavigationGeneral),
        nodeAutoclickers: NC.Render.getId(NC.RenderRegistry.elements.button.storeMenuNavigationAutoclickers)
    }
    for (node of Object.values(nodes)) { node.classList.remove("menu-navigation-button-focused"); }
    switch (NC.AppModel.runtime.storeMenuCategoryLoaded) {
        case "general": { nodes.nodeGeneral.classList.add("menu-navigation-button-focused"); break; }
        case "autoclickers": { nodes.nodeAutoclickers.classList.add("menu-navigation-button-focused"); break; }
        default: {
            return NC.Logs.internalError(
                `Category "${NC.AppModel.runtime.storeMenuCategoryLoaded}" to highlight store menu button of does not exist`
            );
            break;
        }
    }
}

NC.Render.theme = function() {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(NC.AppModel.core.gameTheme);
}

NC.Render.fullscreen = function() {
    switch (NC.AppModel.runtime.fullscreen) {
        case true: {
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            }
            break;
        }
        case false: {
            if (document.body.requestFullscreen && document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;
        }
        default: {
            return NC.Logs.internalError("NC.AppModel.runtime.fullscreen is invalid");
            break;
        }
    }
}

NC.Render.sfxVolume = function() {
    const textNode = 
        NC.Render.getId(NC.RenderRegistry.elements.textfield.sfxVolume);
    const buttonNode =
        NC.Render.getId(NC.RenderRegistry.elements.button.sfxVolume);
    textNode.innerText = NC.AppModel.core.sfxVolume;
    buttonNode.value = NC.AppModel.core.sfxVolume;
}

NC.Render.autosave = function() {
    const node = NC.Render.getId(NC.RenderRegistry.elements.button.autosave);
    if (!node) { return; }
    NC.AppModel.core.autosaveEnabled === true ? node.innerText = "on" : node.innerText = "off";
}

NC.Render.screenBoxNotification = function(message) {
    let box = document.createElement("div");
    box.classList.add("screenbox-notification");
    box.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(box);
    setTimeout(() => { box.classList.add("screenbox-notification-ready") }, 300);
    setTimeout(() => {
        box.classList.remove("screenbox-notification-ready");
        setTimeout(() => {
            box.remove();
        }, 300);
    }, 3500);
}
NC.Render.screenBoxConfirm = function(message) {
    return new Promise((resolve) => {
        let box = document.createElement("div");
        let screen = document.createElement("div");
        box.classList.add("screenbox-confirm");
        screen.id = NC.RenderRegistry.elements.page.screenboxConfirmScreen.id;
        const close = (result) => {
            box.classList.remove("screenbox-confirm-ready");
            screen.classList.remove("screenbox-confirm-screen-ready");
            setTimeout(() => {
                box.remove();
                screen.remove();
            }, 300);
            resolve(result);
        }
        box.innerHTML = `
            <div class="screenbox-confirm-text">
                <p>${message}</p>
            </div>
            <div class="screenbox-confirm-buttons">
                <div class="continue">
                    <p>continue</p>
                </div>
                <div class="cancel">
                    <p>cancel</p>
                </div>
            </div>
        `;
        box.querySelector(".continue").addEventListener("click", () => close(true));
        box.querySelector(".cancel").addEventListener("click", () => close(false));
        document.body.appendChild(box);
        document.body.appendChild(screen);
        setTimeout(() => { 
            box.classList.add("screenbox-confirm-ready");
            screen.classList.add("screenbox-confirm-screen-ready");
        }, 300);
    });
}
NC.Render.screenBoxAchievement = function(ach) {
    let box = document.createElement("div");
    box.classList.add("screenbox-achievement");
    box.innerHTML = `
        <h1>${ach.title}</h1>
        <p>${ach.desc}</p>
    `;
    document.body.appendChild(box);
    setTimeout(() => { box.classList.add("screenbox-achievement-ready") }, 300);
    setTimeout(() => {
        box.classList.remove("screenbox-achievement-ready");
        setTimeout(() => {
            box.remove();
        }, 300);
    }, 3500);
}

NC.Render.saveSlotsConfigButtonRejected = function(save, action) {
    let registryNode = {};
    if (save == "all") {
        registryNode = NC.RenderRegistry.elements.button.saveSlotsConfigAllReset;
    } else {
        const capitalizedAction = action.charAt(0).toUpperCase() + action.slice(1);
        const key = `saveSlotsConfig${save}${capitalizedAction}`;
        registryNode =
            NC.RenderRegistry.elements.button[key];
    }
    NC.Render.buttonReject(registryNode);
}

NC.Render.storeItemRejected = function(item) {
    let registryNode = NC.RenderRegistry.elements.button[`${item}Store`];
    NC.Render.containerReject(registryNode);
}

NC.Render.buttonReject = function(registryNode) {
    const node = NC.Render.getId(registryNode);
    if (!node) { return; }
    NC.Render.animate(node, "button-reject");
}

NC.Render.containerReject = function(registryNode) {
    const node = NC.Render.getId(registryNode);
    if (!node) { return; }
    NC.Render.animate(node, "container-reject");
}

NC.Render.flushStoreItem = function(itemInfo) {
    const key = itemInfo[0];
    const node = NC.Render.getId(NC.RenderRegistry.elements.button[`${key}Store`]);
    const priceNode = NC.Render.getId(NC.RenderRegistry.elements.textfield[`${key}Price`]);
    const object = NC.GameModel.store[itemInfo[1]][key];
    if (object.available === false) {
        node.classList.add("store-menu-container-unavailable");
    } else if (object.available === true) {
        node.classList.remove("store-menu-container-unavailable");
    }
    priceNode.innerText = object.price;
}

NC.Render.gamblingStats = function() {
    const wonNode = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblesWon);
    const lostNode = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblesLost);
    const pointsWonNode = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblingPointsWon);
    const pointsLostNode = NC.Render.getId(NC.RenderRegistry.elements.textfield.gamblingPointsLost);
    if (!wonNode || !lostNode || !pointsWonNode || !pointsLostNode) { return; }
    wonNode.innerText = NC.GameModel.core.gamblesWon;
    lostNode.innerText = NC.GameModel.core.gamblesLost;
    pointsWonNode.innerText = NC.GameModel.core.gamblingPointsWon;
    pointsLostNode.innerText = NC.GameModel.core.gamblingPointsLost;
}

NC.Render.cursorCrackEffect = function(action) {
    const registryNode = NC.RenderRegistry.elements.page.cursorCrackEffect;
    switch (action) {
        case "add": {
            let elem = document.createElement("div");
            elem.id = registryNode.id;
            document.body.appendChild(elem);
            elem.style.opacity = "1";
            break;
        }
        case "remove": {
            const node = NC.Render.getId(registryNode);
            node.style.opacity = "0";
            setTimeout(() => { node.remove(); }, 500);
            break;
        }
        default: {
            return NC.Logs.internalError(`"${action}" is not a valid action`);
        }
    }
}

NC.Render.splashScreen = function() {
    const splashRegistryNode = NC.RenderRegistry.elements.page.splashScreen;
    const splashLogoRegistryNode = NC.RenderRegistry.elements.page.splashScreenLogo;
    let elem = document.createElement("div");
    elem.id = splashRegistryNode.id;
    elem.innerHTML = NC.HTML.constants.splashScreen;
    document.body.appendChild(elem);
    setTimeout(() => {
        elem.style.opacity = "0";
        setTimeout(() => {
            elem.remove();
        }, 500);
    }, 3000);
}

NC.Render.initialFlush = function() {
    NC.Render.theme();
    NC.Render.points();
    NC.Render.version();
    NC.Render.clickPower();
    NC.Render.saveSlot();
    return NC.Logs.internalMessage("Performed initial render");
}