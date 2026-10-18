const bgMusic = document.getElementById("bgMusic");

const playButton = document.getElementById("pp");
const muteButton = document.getElementById("mu");
const volumeSlider = document.getElementById("vol");
const soundButton = document.getElementById("sx");

let soundEffectsEnabled = true;

/* ================= MUSIC ================= */

function playMusic() {
    if (!bgMusic) {
        console.error("Audio element not found!");
        return;
    }

    bgMusic.volume = Number(volumeSlider.value);

    bgMusic.play()
        .then(() => {
            playButton.textContent = "Ⅱ";
            console.log("Music is playing");
        })
        .catch((error) => {
            console.error("Music could not play:", error);
        });
}


function pauseMusic() {
    if (!bgMusic) return;

    bgMusic.pause();

    playButton.textContent = "♪";
}


function toggleMusic() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}


/* ================= VOLUME ================= */

volumeSlider.addEventListener("input", () => {
    bgMusic.volume = Number(volumeSlider.value);
});


/* ================= MUTE ================= */

function toggleMute() {
    if (!bgMusic) return;

    bgMusic.muted = !bgMusic.muted;

    muteButton.textContent =
        bgMusic.muted ? "🔇" : "🔊";
}


/* ================= SOUND EFFECT BUTTON ================= */

function toggleSoundEffects() {

    soundEffectsEnabled =
        !soundEffectsEnabled;

    soundButton.textContent =
        soundEffectsEnabled
            ? "✨"
            : "🔕";
}


function sfx(type) {

    if (!soundEffectsEnabled) return;

    // Sound effects can be added later.
}


/* ================= BUTTON EVENTS ================= */

playButton.addEventListener(
    "click",
    toggleMusic
);

muteButton.addEventListener(
    "click",
    toggleMute
);

soundButton.addEventListener(
    "click",
    toggleSoundEffects
);


/* ================= AUDIO ERROR CHECK ================= */

bgMusic.addEventListener(
    "error",
    () => {

        console.error(
            "❌ Could not load magic-music.mp3"
        );

    }
);

bgMusic.addEventListener(
    "canplaythrough",
    () => {

        console.log(
            "✅ magic-music.mp3 loaded successfully"
        );

    }
);
