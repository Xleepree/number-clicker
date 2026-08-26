NC.Audio.subscribeToEvents = function() {
    NC.Events.Signals.on(NC.Events.events.generic.firstUserInteraction, () => {
        NC.Audio.runtime.audioEnabled = true;
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

NC.Audio.playSfx = function(id, volume = 100) {
    const sfxAudio = document.getElementById(`sfx_${id}`);
    if (!sfxAudio) {
        return NC.Logs.internalError(`Could not find audio element for SFX "${id}"`);
    } else if (!NC.Audio.runtime.audioEnabled) {
        return NC.Logs.internalWarning(`Refusing to play SFX "${id}," audio is disabled`);
    } else {
        sfxAudio.currentTime = 0;
        sfxAudio.volume = (NC.AppModel.core.sfxVolume * (volume / 100)) / 100;
        sfxAudio.play();
    }
}