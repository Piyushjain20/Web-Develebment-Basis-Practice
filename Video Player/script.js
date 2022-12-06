const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("play-btn");
const videoEle = document.querySelector("video");
const playBackSpeed = document.querySelector(".player-speed");
const fullScreenBtn = document.querySelector(".fa-expand");
const videoDuration = document.querySelector(".time-duration");
const videoCurrentTime = document.querySelector(".time-elapsed");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const volumeBtn = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const playerEle = document.querySelector(".player");
// Play & Pause ----------------------------------- //
function toogleVideoPlayBack() {
  if (videoEle.paused) {
    videoEle.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.title = "Pause";
  } else {
    videoEle.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.title = "Play";
  }
}
// Video Duration set on load
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 > 10 ? Math.floor(time % 60) : "0" + Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}
videoEle.addEventListener("durationchange", () => {
  videoDuration.textContent = ` / ${displayTime(videoEle.duration)}`;
});

// Progress Bar ---------------------------------- //
function updateProgrss() {
  progressBar.style.width = `${(videoEle.currentTime / videoEle.duration) * 100}%`;
  // update current Time
  videoCurrentTime.textContent = displayTime(videoEle.currentTime);
}

function setProgress(e) {
  const newTime = (e.offsetX / progressRange.offsetWidth) * videoEle.duration;
  videoEle.currentTime = newTime;
}

// Volume Controls --------------------------- //
let lastVolume = 1;
function toggleMute() {
  if (videoEle.volume) {
    lastVolume = videoEle.volume;
    videoEle.volume = 0;
    volumeBar.style.width = `0%`;
    setVolumeIcon(0);
  } else {
    if (lastVolume == 0) lastVolume = 0.1;
    videoEle.volume = lastVolume;
    setVolumeIcon(lastVolume);
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}
function setVolume(e) {
  let vol = e.offsetX / volumeRange.offsetWidth;
  if (vol < 0.1) vol = 0;
  volumeBar.style.width = `${vol * 100}%`;
  setVolumeIcon(vol);
  videoEle.volume = vol;
  lastVolume = vol;
}
function setVolumeIcon(currentVolume) {
  volumeBtn.className = "";
  if (currentVolume === 0) {
    volumeBtn.className = "fa-solid fa-volume-xmark";
    volumeBtn.title = "Unmute";
  } else if (currentVolume > 0 && currentVolume < 0.75) {
    volumeBtn.className = "fa-solid fa-volume-low";
    volumeBtn.title = "Mute";
  } else {
    volumeBtn.className = "fa-solid fa-volume-high";
    volumeBtn.title = "Mute";
  }
}

// Change Playback Speed -------------------- //
playBackSpeed.addEventListener("change", () => (videoEle.playbackRate = playBackSpeed.value));

// Fullscreen ------------------------------- //
let isFullscreen = false;

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  videoEle.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoEle.classList.remove("video-fullscreen");
}
fullScreenBtn.addEventListener("click", () => {
  if (isFullscreen) {
    closeFullscreen();
  } else {
    openFullscreen(playerEle);
  }
  isFullscreen = !isFullscreen;
});

// Event Listeners

videoEle.addEventListener("ended", () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "Play";
});
videoEle.addEventListener("click", toogleVideoPlayBack);
playBtn.addEventListener("click", toogleVideoPlayBack);
videoEle.addEventListener("timeupdate", updateProgrss);
volumeBtn.addEventListener("click", toggleMute);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", setVolume);
