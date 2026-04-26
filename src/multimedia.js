// anim
NC.Multimedia.animateElement = function(id, animClass) {
    const elem = document.getElementById(id);
    if (!elem) {
        console.error(`Element "${id}" to animate not found.`);
        return;
    }
    elem.classList.remove("pop", "fadeInOut");
    void elem.offsetWidth;
    elem.classList.add(animClass);

    elem.addEventListener("animationend", function handler() {
        elem.classList.remove(animClass);
        elem.removeEventListener("animationend", handler);
    });
}
NC.Multimedia.animateElements = function(elements, animClass) {
    elements.forEach((id) => NC.Multimedia.animateElement(id, animClass));
}

// sfx
NC.Multimedia.playSfx = function(sfx, vol) {
    if (NC.Bootstrap.gameStateLive.multimediaUnlocked == false) { return; }
    const sfxHTML = document.getElementById(`sfx_${sfx}`);
    if (sfxHTML) {
        sfxHTML.currentTime = 0;
        if (vol == null) {
            vol = 1;
        }
        sfxHTML.volume = vol;
        sfxHTML.play();
    } else { return console.error(`Could not find "${sfx}" element to play`); }
}
NC.Multimedia.playSfxRandomPitch = function(sfx, vol) {
    if (NC.Bootstrap.gameStateLive.multimediaUnlocked == false) { return; }
    const sfxHTML = document.getElementById(`sfx_${sfx}`);
    if (sfxHTML) {
        sfxHTML.playbackRate = 0.6 + Math.random() * 0.5;
        sfxHTML.currentTime = 0;
        if (vol == null) {
            vol = 1;
        }
        sfxHTML.volume = vol;
        sfxHTML.play();
    } else { return console.error(`Could not find "${sfx}" element to play`); }
}
NC.Multimedia.constants.sfxList = {
    "sfx_clickSound": "audio/sfx/click.wav",
    "sfx_storeBellSound": "audio/sfx/store-bell.mp3",
    "sfx_badAlertSound": "audio/sfx/badalert.wav",
    "sfx_mujajaLaugh": "audio/sfx/mujaja.mp3",
    "sfx_gunCock": "audio/sfx/gun-cock.mp3",
    "sfx_clangSound": "audio/sfx/clang.mp3",
    "sfx_diceThrow": "audio/sfx/dice.mp3",
    "sfx_achSound": "audio/sfx/ach.wav",
    "sfx_ohSnap": "audio/sfx/ohsnap.wav",
    "sfx_knockou": "audio/sfx/knockou.wav",
    "sfx_freepBeep": "audio/sfx/freepbeep.wav",
    "sfx_sewing": "audio/sfx/sewing.wav",
    "sfx_velcro": "audio/sfx/velcro.wav",
    "sfx_boom": "audio/sfx/boom.ogg",
    "sfx_whatHaveYouDone": "audio/sfx/whathaveyoudone.wav",
    "sfx_keyboardy": "audio/sfx/keyboardy.ogg",
    "sfx_feelingFunny": "audio/sfx/feelingFunny.wav",
    "sfx_magick": "audio/sfx/magick.mp3",
    "sfx_powenup": "audio/sfx/powenup.wav",
    "sfx_syringe": "audio/sfx/syringe.wav",
    "sfx_infoDing": "audio/sfx/infoDing.wav",
    "sfx_menuSwitchy": "audio/sfx/menuSwitchy.wav",
    "sfx_confirmyLialog": "audio/sfx/confirmyLialog.wav",
    "sfx_svribble": "audio/sfx/svribble.wav",
    "sfx_trash": "audio/sfx/trash.wav",
    "sfx_compac": "audio/sfx/compac.wav",
    "sfx_pillSpill": "audio/sfx/pillSpill.wav",
    "sfx_boston": "audio/sfx/boston.wav"
}
NC.Multimedia.loadSfxElements = function() {
    for (const [id, src] of Object.entries(NC.Multimedia.constants.sfxList)) {
        const audio = document.createElement("audio");
        audio.id = id;
        audio.src = src;
        document.body.prepend(audio);
    }
}

// sfx vol.
NC.Multimedia.constants.sfxElements = Array.from(document.querySelectorAll('audio[id^="sfx_"]'));
NC.Multimedia.setSfxVol = function(value) {
    const volume = value / 100;
    for (const el of NC.Multimedia.constants.sfxElements) {
        el.volume = volume;
    }
    document.getElementById("sfx_sfxValue").innerText = `${value} `;
    localStorage.setItem("sfxVolume", value);
}

// multimedia wait
NC.Multimedia.waitForMultimedia = function() {
    window.addEventListener("pointerdown", () => {
        NC.Bootstrap.gameStateLive.multimediaUnlocked = true;
    }, {once: true});
}

// fullscreen
NC.Multimedia.toggleWindowFullscreen = function() {
    if (document.body.requestFullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        document.body.requestFullscreen();
        NC.Ui.notifC("you have entered number clicker in fullscreen. You can press F11 or Esc to leave, or toggle manually from options.");
    }
}

NC.constantsFunction("Multimedia");