NC.Audio.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.generic.firstUserInteraction, () => {
        NC.Audio.runtime.audioEnabled = true;
    });
    NC.Events.Signals.on(NC.Events.events.appModel.sfxVolumeChanged, () => {
        NC.Audio.updateGlobalSfxVolume();
    });
}

NC.Audio.runtime = {
    audioEnabled: false
}

NC.Audio.initializeSfxList = async function() {
    const response = await fetch("audio/sfx.json");
    if (!response.ok) {
        return NC.Logs.internalError(`Attempting to fetch the SFX list returned HTTP ${response.status}`);
    } else {
        const json = await response.json();
        NC.Audio.constants.sfx = json;
    }
    return NC.Logs.internalMessage("Initialized NC.Audio.constants.sfx");
}

NC.Audio.initializeAllSfx = function() {
    for (const [id, src] of Object.entries(NC.Audio.constants.sfx)) {
        const audio = document.createElement("audio");
        audio.id = `sfx_${id}`;
        audio.src = src;
        document.body.prepend(audio);
    }
    return NC.Logs.internalMessage("Entered SFX into the DOM");
}

NC.Audio.playSfx = function(id, volume) {
    const sfxAudio = document.getElementById(`sfx_${id}`);
    if (!sfxAudio) {
        return NC.Logs.internalError(`Could not find audio element for SFX "${id}"`);
    } else if (!NC.Audio.runtime.audioEnabled) {
        return NC.Logs.internalWarning(`Refusing to play SFX "${id}," audio is disabled`);
    } else {
        sfxAudio.currentTime = 0;
        volume ??= 100;
        sfxAudio.volume = volume / 100;
        sfxAudio.play();
    }
}

NC.Audio.updateGlobalSfxVolume = function() {
    const volume = NC.AppModel.core.sfxVolume;
    const valueVolume = volume / 100;
    const sfxVolumes = Array.from(document.querySelectorAll(`audio[id^="sfx_"`));
    for (const element of sfxVolumes) { element.volume = valueVolume; }
}