const albumArt = document.getElementById("image");
const musicTitle = document.getElementById("title");
const musicArtist = document.getElementById("artist");
const audioElement = document.getElementById("audio");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const mainBtn = document.getElementById("mainBtn");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
// Music
const songs = [
  {
    id: 1,
    displayName: "Sunflower",
    artist: "Post Malone",
  },
  {
    id: 2,
    displayName: "As It Was",
    artist: "Harry Styles",
  },
  {
    id: 3,
    displayName: "All of Me ",
    artist: "John Legend",
  },
  {
    id: 4,
    displayName: "Sugar",
    artist: "Maroon 5",
  },
];

let isPlaying = false;
let currentSongId = 1;

function changeCurrentTime() {
  let sec = audioElement.currentTime % 60 < 10 ? `0${Math.floor(audioElement.currentTime % 60)}` : Math.floor(audioElement.currentTime % 60);
  currentTime.textContent = Math.floor(audioElement.currentTime / 60) + ":" + sec;
}
function changeDuration() {
  let sec = audioElement.duration % 60 < 10 ? `0${Math.floor(audioElement.duration % 60)}` : Math.floor(audioElement.duration % 60);
  duration.textContent = Math.floor(audioElement.duration / 60) + ":" + sec;
}
function updateProgressBar(e) {
  if (isPlaying) {
    changeCurrentTime();
    progress.style.width = `${(e.target.currentTime / e.target.duration) * 100}%`;
  }
}
function seekSong(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioElement.duration;
  audioElement.currentTime = Math.floor((clickX / width) * duration);
}

function playSong() {
  audioElement.play();
  mainBtn.classList.replace("fa-play", "fa-pause");
  mainBtn.title = "Pause";
  isPlaying = true;
}
function pauseSong() {
  audioElement.pause();
  mainBtn.classList.replace("fa-pause", "fa-play");
  mainBtn.title = "Play";
  isPlaying = false;
}
function songLoad() {
  audioElement.src = `./Music/music${currentSongId}.mp3`;
  albumArt.src = `./images/photo${currentSongId}.avif`;
  musicTitle.textContent = songs[currentSongId - 1].displayName;
  musicArtist.textContent = songs[currentSongId - 1].artist;
  audioElement.addEventListener("durationchange", changeDuration);
  playSong();
}
function nextTrack() {
  currentSongId = currentSongId === songs.length ? 1 : currentSongId + 1;
  songLoad();
}
function previousTrack() {
  currentSongId = currentSongId === 1 ? songs.length : currentSongId - 1;
  songLoad();
}

//Events
audioElement.addEventListener("timeupdate", updateProgressBar);
prevBtn.addEventListener("click", previousTrack);
mainBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
nextBtn.addEventListener("click", nextTrack);
progressContainer.addEventListener("click", seekSong);
audioElement.addEventListener("ended", nextTrack);
