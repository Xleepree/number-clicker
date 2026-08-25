(function() {
    document.addEventListener("DOMContentLoaded", () => {
        numberClicker();
    });
    async function numberClicker() {
        NC.Events.subscribeAllDomains();
        NC.Events.chainEvents();
        await NC.Audio.initializeSfxList();
        NC.Audio.initializeAllSfx();
        NC.Storage.loadAppModel();
        NC.Storage.initializeSave();
        NC.Storage.Autosave.check();
        NC.Render.initialFlush();
        NC.Handlers.Init.menus();
        NC.Handlers.Init.firstUserInteraction();
        NC.Handlers.Init.Cps();
        NC.Handlers.Init.autoclick();
        NC.Handlers.Init.splashScreen();
        NC.freezeAllDomainConstants();
        return NC.Logs.internalMessage(
            `Initialized number clicker, version ${NC.version}`
        );
    }
})();
