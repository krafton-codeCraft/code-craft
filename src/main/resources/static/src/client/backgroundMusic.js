document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volumeControl');

    // Play or pause the audio
    playPauseBtn.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = "Pause";
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = "Play";
        }
    });

    // Adjust the volume
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value;
    });
});




